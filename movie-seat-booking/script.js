const container = document.querySelector('.container');
// Seats in the row that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // puts into a NodeList (we can run array methods on it)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const ticketPrice = +movieSelect.value; // + changes the string to a number (like parseInt)

container.addEventListener('click', (e) => {
    // select an unoccupied seat
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }
});


