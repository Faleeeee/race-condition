const Seat = require('../Models/Seat');

const SeatController = {
    checkSeat: async (req, res) => {
        const { match_id } = req.params;

        try {
            const result = await Seat.checkSeat(match_id);
            res.status(200).json({ message: 'Get seat match successfully', result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error getting seat match', error: err.message });
        }
    }
};

module.exports = SeatController;
