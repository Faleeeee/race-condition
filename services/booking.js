const seatsContainer = document.querySelector(".seats");
const selectedSeatsEl = document.getElementById("selected-seats");
const totalPriceEl = document.getElementById("total-price");
const bookButton = document.getElementById("book-button");
let selectedSeats = [];
let totalPrice = 0;
const seatPrice = 100000;
let currentMatchId = null;

const seatData = {
  1: [
    {
      row: "A",
      seats: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        available: true,
      })),
    },
    {
      row: "B",
      seats: Array.from({ length: 10 }, (_, i) => ({
        id: i + 11,
        available: true,
      })),
    },
  ],
};

document
  .getElementById("bookingModal")
  .addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    currentMatchId = parseInt(button.dataset.matchId, 10);
    loadSeats(currentMatchId);
  });

function loadSeats(matchId) {
  seatsContainer.innerHTML = "";
  const rows = seatData[matchId];
  rows.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("seat-row");
    row.seats.forEach((seat) => {
      const seatDiv = document.createElement("div");
      seatDiv.classList.add(
        "seat",
        seat.available ? "available" : "unavailable"
      );
      seatDiv.dataset.id = seat.id;
      seatDiv.addEventListener("click", handleSeatClick);
      seatDiv.textContent = `${row.row}${seat.id}`;
      rowDiv.appendChild(seatDiv);
    });
    seatsContainer.appendChild(rowDiv);
  });
}

function handleSeatClick(event) {
  const seat = event.target;
  if (!seat.classList.contains("available")) return;

  const seatId = parseInt(seat.dataset.id, 10);
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter((s) => s !== seatId);
    totalPrice -= seatPrice;
  } else {
    seat.classList.add("selected");
    selectedSeats.push(seatId);
    totalPrice += seatPrice;
  }
  updateBookingDetails();
}

function updateBookingDetails() {
  selectedSeatsEl.textContent = selectedSeats.join(", ");
  totalPriceEl.textContent = totalPrice.toLocaleString();
  bookButton.disabled = selectedSeats.length === 0;
}

bookButton.addEventListener("click", async () => {
  if (!selectedSeats.length) return alert("Please select at least one seat!");
  alert("Booking successful!");
  selectedSeats = [];
  totalPrice = 0;
  updateBookingDetails();
});
