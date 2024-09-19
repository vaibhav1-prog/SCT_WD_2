// script.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById('display');
const laps = document.getElementById('laps');
const clickSound = document.getElementById('click-sound');

// Play click sound
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// Update display time
function updateDisplay(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 100);
    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
    display.style.transform = 'scale(1.05)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 200);
}

// Start the stopwatch
function start() {
    playSound();
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
    }, 100);
    toggleButtons(['pause', 'lap'], ['start']);
}

// Pause the stopwatch
function pause() {
    playSound();
    clearInterval(timerInterval);
    toggleButtons(['start'], ['pause', 'lap']);
}

// Reset the stopwatch
function reset() {
    playSound();
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(0);
    laps.innerHTML = '';
    toggleButtons(['start'], ['pause', 'lap']);
}

// Record lap time
function recordLap() {
    playSound();
    const lapTime = document.createElement('li');
    lapTime.textContent = display.textContent;
    laps.appendChild(lapTime);
}

// Toggle button visibility
function toggleButtons(showButtons, hideButtons) {
    showButtons.forEach(id => document.getElementById(id).style.display = 'inline-block');
    hideButtons.forEach(id => document.getElementById(id).style.display = 'none');
}

// Initialize
updateDisplay(0);
toggleButtons(['start'], ['pause', 'lap']);

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);
