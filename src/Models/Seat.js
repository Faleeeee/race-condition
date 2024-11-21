const db = require('../config/db');

const Seat = {
    checkSeat: async (match_id) => {
        try {
            const chechStatusSeat = `
                SELECT seatStatus.*, seat.seat_number 
                FROM seatStatus 
                INNER JOIN seat ON seatStatus.seat_id = seat.seat_id 
                WHERE seatStatus.match_id = ? 
                FOR UPDATE
            `;
            const [rows] = await db.promise().query(chechStatusSeat, [match_id]);

            if (rows.length === 0) {
                throw new Error('Seat not found');
            }

            return rows;
        } catch (error) {
            console.error('Error fetching seats:', error.message);
            throw error;
        }
    }
};

module.exports = Seat;
