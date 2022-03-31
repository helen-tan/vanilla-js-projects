const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showSongs(data);
}

// Show songs and artists in DOM
function showSongs(data) {
    
}

// Event Listeners
form.addEventListener('submit', e => {
    e.preventDefault(); // For a submit event, this prevents it from actually submitting to file

    const searchTerm = search.value.trim();

    // Validation: Check if something was entered
    if(!searchTerm) {
        alert('Please type in a search term');
    } else {
        searchSongs(searchTerm);
    }
});

