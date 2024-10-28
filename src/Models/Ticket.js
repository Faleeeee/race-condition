const db = require('../config/db');

const Ticket = {
    bookTicket: (match_id, user_id, seat_number, bookingDate, callback) => {
        const sql = 'INSERT INTO tickets (match_id, user_id, seat_number, booking_date) VALUES (?, ?, ?, ?)';
        const values = [match_id, user_id, seat_number, bookingDate];

        db.query(sql, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        })
    }
};

module.exports = Ticket;
