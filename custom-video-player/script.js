const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play & Pause video
function toggleVideoStatus() {
    if(video.paused){ // if paused
        video.play();
    } else { // if playing
        video.pause();
    }
}

// Update play/pause icon
function updatePlayIcon() {
    if(video.paused){
        play.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
    } else {
        play.innerHTML = `<i class="fas fa-pause fa-2x"></i>`;
    }
}

// Update progress & timestamp
function updateProgress() {
    return true;
}

// Set video time to progress
function setVideoProgress() {
    return true;
}

// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}


// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);


