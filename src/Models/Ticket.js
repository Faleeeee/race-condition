const db = require('../config/db');

const Ticket = {
    bookTicket: (match_id, user_id, seat_number, callback) => {
        const sql = 'INSERT INTO tickets (match_id, user_id, seat_number, booking_time) VALUES (?, ?, ?, NOW())';
        const values = [match_id, user_id, seat_number];

        db.query(sql, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        })
    }
};

module.exports = Ticket;
