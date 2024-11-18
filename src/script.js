const axios = require('axios')
async function sendRequest() {
    const url = 'http://localhost:3001/api/ticket/bookTicket';
    const data1 = { match_id: 1, seat_id: 11, user_id: 3 };
    const data2 = { match_id: 1, seat_id: 11, user_id: 4 };
    const data3 = { match_id: 1, seat_id: 11, user_id: 5 };

    const request = [
        axios.post(url, data1),
        axios.post(url, data2),
        axios.post(url, data3),
    ]


    try {
        const result = await Promise.all(request);
        console.log('check')
        console.log('Results:', result.map(res => res.data));
    } catch (error) {
        console.error('Error booking ticket-Deadlock found when trying to get lock; try restarting transaction', error.response?.data || error.message);
    }
}

sendRequest();
