const container = document.querySelector('.container');
// Seats in the row that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // puts into a NodeList (we can run array methods on it)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; // + changes the string to a number (like parseInt)
console.log(ticketPrice);


// Save selected Movie index & price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

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

    // update UI on selected seat count & ticket price
    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length > 0){   // if there are selected seats saved
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){ // check every seat to see if it is one of the seats in the saved array
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
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

    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();

