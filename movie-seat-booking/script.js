const container = document.querySelector('.container');
// Seats in the row that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // puts into a NodeList (we can run array methods on it)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // + changes the string to a number (like parseInt)

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // will store a NodeList of the selected seats

    // selectedSeats is a NodeList of divs, which we cannot store in localStorage
    // We need to create an array of indexes

    // Convert the NodeLists of selected seats into a regular array
    // Map through array
    // Return a new array of indexes
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });
    // Save selected seats arr to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Event Listener
// Seat click event
container.addEventListener('click', (e) => {
    // select an unoccupied seat (event delegation)
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});


