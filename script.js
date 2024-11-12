let isClockMode = true;
let timerInterval;
let clockInterval;
let timerTime = 0;
let isTimerRunning = false;

function changeFont(fontFamily) {
    document.getElementById('display').style.fontFamily = fontFamily;
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("display").textContent = `${hours}:${minutes}:${seconds}`;
}

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimer() {
    timerTime++;
    document.getElementById("display").textContent = formatTime(timerTime);
}

function startTimer() {
    if (!isTimerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        isTimerRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    pauseTimer();
    timerTime = 0;
    document.getElementById("display").textContent = formatTime(timerTime);
}

function toggleMode() {
    isClockMode = !isClockMode;
    const modeButton = document.querySelector(".mode-switch button");
    const timerButtons = document.getElementById("timerButtons");

    // Clear both intervals to prevent multiple intervals running
    clearInterval(clockInterval);
    clearInterval(timerInterval);

    if (isClockMode) {
        modeButton.textContent = "Switch to Timer";
        timerButtons.style.display = "none";
        updateClock();
        clockInterval = setInterval(updateClock, 1000);
    } else {
        modeButton.textContent = "Switch to Clock";
        timerButtons.style.display = "block";
        resetTimer();
    }
}

// Start the clock on load
updateClock();
clockInterval = setInterval(updateClock, 1000);