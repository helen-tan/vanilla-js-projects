const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
    text.innerText = 'Breath In!';

    setTimeout(() => {
        text.innerText = 'Hold';
        
        setTimeout(() => {
            text.innerText = 'Breathe Out!';
        }, holdTime);

    }, breatheTime);
}

// Repeat breathe animation 
setInterval(breathAnimation, totalTime);