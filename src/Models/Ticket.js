const db = require('../config/db');

// const Ticket = {
//     bookTicket: async (match_id, seat_id, user_id, callback) => {
//         try {
//             // Đảm bảo rằng transaction có cấp độ isolation Serializable
//             await db.promise().query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');
//             await db.promise().query('START TRANSACTION');

//             // Check status seat
//             const checkStatusSeat = 'SELECT status FROM seatstatus WHERE seat_id=? AND match_id=? FOR UPDATE';
//             const [rows] = await db.promise().query(checkStatusSeat, [seat_id, match_id]);

//             if (rows.length === 0) {
//                 throw new Error('Seat not found');
//             }

//             if (rows[0].status === 'Booked') {
//                 throw new Error('Seat is already booked');
//             }

//             // Chèn vé mới
//             const insertTicketSql = 'INSERT INTO ticket (match_id, seat_id, user_id, purchase_date) VALUES (?, ?, ?, NOW(3))';
//             const values = [match_id, seat_id, user_id];
//             await db.promise().query(insertTicketSql, values);

//             // Cập nhật trạng thái vé
//             const updateStatusTicket = 'UPDATE seatstatus SET status = "booked" WHERE seat_id=? AND match_id=?';
//             await db.promise().query(updateStatusTicket, [seat_id, match_id]);

//             // Commit transaction
//             await db.promise().query('COMMIT');
//             callback(null, { message: "Booking successful" });
//         } catch (err) {
//             // Rollback transaction khi gặp lỗi
//             await db.promise().query('ROLLBACK');
//             callback({ message: 'Error booking ticket', error: err.message }, null);
//         }
//     }
// };

// module.exports = Ticket;


// const Ticket = {
//     bookTicket: async (match_id, seat_id, user_id, callback) => {
//         try {
//             await db.promise().query('START TRANSACTION');

//             // Kiểm tra trạng thái ghế và khóa bản ghi
//             const checkStatusSeat = 'SELECT status FROM seatstatus WHERE seat_id = ? AND match_id = ? FOR UPDATE';
//             const [rows] = await db.promise().query(checkStatusSeat, [seat_id, match_id]);

//             if (rows.length === 0) {
//                 throw new Error('Seat not found');
//             }

//             if (rows[0].status === 'Booked') {
//                 throw new Error('Seat is already booked');
//             }

//             // Cập nhật trạng thái ghế
//             const updateStatusTicket = 'UPDATE seatstatus SET status = "Booked", user_id = ?, updated_at = NOW() WHERE seat_id = ? AND match_id = ?';
//             await db.promise().query(updateStatusTicket, [user_id, seat_id, match_id]);

//             // Chèn vé vào bảng ticket
//             const insertTicketSql = 'INSERT INTO ticket (match_id, seat_id, user_id, purchase_date) VALUES (?, ?, ?, NOW())';
//             await db.promise().query(insertTicketSql, [match_id, seat_id, user_id]);

//             await db.promise().query('COMMIT');
//             callback(null, { message: 'Booking successful' });
//         } catch (err) {
//             await db.promise().query('ROLLBACK');

//             // Kiểm tra lỗi do ràng buộc UNIQUE
//             if (err.code === 'ER_DUP_ENTRY') {
//                 callback({ message: 'Error: Seat already booked by another user' }, null);
//             } else {
//                 callback({ message: 'Error booking ticket', error: err.message }, null);
//             }
//         }
//     }
// };

// module.exports = Ticket;

const Ticket = {
    bookTicket: async (match_id, seat_id, user_id, callback) => {
        try {
            await db.promise().query('START TRANSACTION');

            // Cập nhật trạng thái ghế trực tiếp nếu chưa được đặt
            const updateStatusTicket = `
                    UPDATE seatstatus
                    SET status = "Booked", user_id = ?, updated_at = NOW()
                    WHERE seat_id = ? AND match_id = ? AND status != "Booked";
                `;
            const [result] = await db.promise().query(updateStatusTicket, [user_id, seat_id, match_id]);

            // Nếu không có hàng nào bị ảnh hưởng, nghĩa là ghế đã được đặt
            if (result.affectedRows === 0) {
                throw new Error('Seat is already booked or not found');
            }

            // Chèn vé vào bảng ticket
            const insertTicketSql = `
                    INSERT INTO ticket (match_id, seat_id, user_id, purchase_date)
                    VALUES (?, ?, ?, NOW());
                `;
            await db.promise().query(insertTicketSql, [match_id, seat_id, user_id]);

            await db.promise().query('COMMIT');
            callback(null, { message: 'Booking successful' });
        } catch (err) {
            await db.promise().query('ROLLBACK');

            // Nếu gặp lỗi deadlock hoặc timeout, tăng retryCount và thử lại
            if (err.code === 'ER_LOCK_WAIT_TIMEOUT' || err.message.includes('Deadlock')) {
                callback({ message: 'Error: Deadlock or timeout, booking failed' }, null);
            } else if (err.message.includes('Seat is already booked')) {
                callback({ message: 'Error: Seat already booked by another user' }, null);
            } else {
                callback({ message: 'Error booking ticket', error: err.message }, null);
            }
        }
    }
};

module.exports = Ticket;
