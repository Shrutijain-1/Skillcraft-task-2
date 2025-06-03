let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById("display");
const lapList = document.getElementById("laps");

const formatTime = (ms) => {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${minutes}:${seconds}.${milliseconds}`;
};

const updateDisplay = () => {
  display.textContent = formatTime(elapsedTime);
};

const start = () => {
  if (timerInterval) return; // Prevent multiple intervals
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
};

const pause = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};

const reset = () => {
  pause();
  elapsedTime = 0;
  updateDisplay();
  lapList.innerHTML = "";
};

const lap = () => {
  if (!elapsedTime) return;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapList.children.length + 1}: ${formatTime(elapsedTime)}`;
  lapList.appendChild(li);
};

// Event Listeners
document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);