const Ticket = require('../Models/Ticket')

const TicketController = {
    bookTicket: (req, res) => {
        const { match_id, user_id, seat_number, bookingDate } = req.body;
        Ticket.bookTicket(match_id, user_id, seat_number, bookingDate, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'Error booking ticket', error: err.message });
            }
            res.status(201).json({ message: 'Ticket booked successfully', result });
        })
    }
};

module.exports = TicketController;
