const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play song
function playSong(){
    musicContainer.classList.add('play');

    // Change play icon to pause icon
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong(){
    musicContainer.classList.remove('play');

    // Change pause icon to play icon
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    // If its the 1st song (index 0) and back btn is clicked (index becomes -ve), go to the last song
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    // If its the last song (index of songs.length - 1) and the next btn is clicked, go to the 1st song
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);