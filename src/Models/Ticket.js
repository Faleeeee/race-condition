const db = require('../config/db');

const Ticket = {
    bookTicket: async (match_id, user_id, callback) => {
        try {
            // Đảm bảo rằng transaction có cấp độ isolation Serializable
            await db.promise().query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');
            await db.promise().query('START TRANSACTION');

            // Truy vấn lấy số seat_number lớn nhất
            const getSeatNumberSql = 'SELECT MAX(seat_number) AS maxSeat FROM tickets WHERE match_id = ? FOR UPDATE';
            const [rows] = await db.promise().query(getSeatNumberSql, [match_id]);
            const latestSeat = rows[0].maxSeat;
            const nextSeat = latestSeat ? latestSeat + 1 : 1;

            // Chèn vé mới
            const insertTicketSql = 'INSERT INTO tickets (match_id, user_id, seat_number, booking_time) VALUES (?, ?, ?, NOW(3))';
            const values = [match_id, user_id, nextSeat];
            await db.promise().query(insertTicketSql, values);

            // Commit transaction
            await db.promise().query('COMMIT');
            callback(null, { message: "Booking successful" });
        } catch (err) {
            // Rollback transaction khi gặp lỗi
            await db.promise().query('ROLLBACK');
            callback({ message: 'Error booking ticket', error: err.message }, null);
        }
    }
};

module.exports = Ticket;
