document.addEventListener('DOMContentLoaded', function() { // Chờ DOM tải xong
    const seatsContainer = document.querySelector('.seats');
    const selectedSeatsEl = document.getElementById('selected-seats');
    const totalPriceEl = document.getElementById('total-price');
    const bookButton = document.getElementById('book-button');
    let selectedSeats = [];
    let totalPrice = 0;

    const seatData = [
        { row: 'A', seats: Array(10).fill(1) },
        { row: 'B', seats: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1] },
        { row: 'C', seats: Array(10).fill(1) },
        { row: 'D', seats: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1] },
        { row: 'E', seats: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1] },
    ];

    const seatPrice = 100000;

    function createSeatMap() {
        seatData.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('seat-row');
            row.seats.forEach((available, index) => {
                const seatDiv = document.createElement('div');
                seatDiv.classList.add('seat');
                seatDiv.classList.add(available ? 'available' : 'unavailable');
                seatDiv.dataset.seat = `${row.row}${index + 1}`;
                seatDiv.dataset.price = seatPrice;
                seatDiv.textContent = seatDiv.dataset.seat;
                seatDiv.addEventListener('click', handleSeatClick);
                rowDiv.appendChild(seatDiv);
            });
            seatsContainer.appendChild(rowDiv);
        });
    }

    function handleSeatClick(event) {
        const seat = event.target;
        if (seat.classList.contains('unavailable')) return;

        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seat.dataset.seat);
            totalPrice -= seatPrice;
        } else {
            seat.classList.add('selected');
            selectedSeats.push(seat.dataset.seat);
            totalPrice += seatPrice;
        }
        updateBookingDetails();
    }

    function updateBookingDetails() {
        selectedSeatsEl.textContent = selectedSeats.join(', ');
        totalPriceEl.textContent = totalPrice;
        bookButton.disabled = selectedSeats.length === 0;
    }

    createSeatMap();
    bookButton.addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            alert(`Ghế đã đặt: ${selectedSeats.join(', ')}\nTổng giá: ${totalPrice} VND`);
            selectedSeats = [];
            totalPrice = 0;
            updateBookingDetails();
            seatsContainer.querySelectorAll('.selected').forEach(seat => seat.classList.remove('selected'));
        } else {
            alert("Vui lòng chọn ghế!");
        }
    });
});