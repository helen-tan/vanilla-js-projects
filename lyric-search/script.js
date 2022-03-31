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
    /*
    let output = '';

    data.data.forEach(song => {
        output += `
            <li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
        `;
    });

    result.innerHTML = `
        <ul class="songs">
            ${output}
        </ul>
    `;
    */

    // Other way - Use map. Shorter and cleaner
    result.innerHTML = `
        <ul class="songs">
            ${data.data.map(song => `
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                </li>
            `)
            .join('')
            }
        </ul>`;

        // If prev or next button exist, output it
        if(data.prev || data.next) {
            more.innerHTML = `
                ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
                ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
            `;
        } else {
            more.innerHTML = '';
        }
}

// Get prev and next songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showSongs(data);
    // Without CORS Anywhere - Will give a CORS error - about cross domain access to a server
    // Every API has different CORS policies
    // closed - have to be on the same domain to access the data
    // A way around this is to use a proxy - Heroku has a CORS proxy - CORS Anywhere
}

// Event Listeners
form.addEventListener('submit', e => {
    e.preventDefault(); // For a submit event, this prevents it from actually submitting to file

    const searchTerm = search.value.trim();

    // Validation: Check if something was entered
    if (!searchTerm) {
        alert('Please type in a search term');
    } else {
        searchSongs(searchTerm);
    }
});

