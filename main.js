
const theTime = document.querySelector('h1');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const timer =document.getElementById('timer');
var elapsedMilliseconds=0;
let int=null;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let timerRunning = false;

 // pad numbers that are displayed so that there are zeroes as placeholders by doing this:
    function pad(n) {
    return n<10 ? '0'+n : n;
    }

//changes the elapsed amount of milliseconds into a display of minutes and seconds
function showMinSec() {
    minutes = Math.floor(elapsedMilliseconds/60000);
    seconds = Math.floor((elapsedMilliseconds - (minutes*60000))/1000);
    milliseconds = (elapsedMilliseconds - (minutes*60000) - (seconds*1000));
   
    timer.textContent = `${pad(minutes)} : ${pad(seconds)} : ${pad(milliseconds)}`;
    theTime.appendChild(timer);
};



// finds elasped time in milleseconds by subtracting the current UTC time from the time of clicking the start button and adding the paused time if needed, then sends to format for display
var grabTime = 0;
var pausedTime =0;
function updateTime() {
    if (timerRunning == true && pausedTime > 0) {
        elapsedMilliseconds = pausedTime + Date.now() - grabTime;
        showMinSec(elapsedMilliseconds);
    }
    if (timerRunning == true && pausedTime == 0){
    elapsedMilliseconds = Date.now() - grabTime;
    
   showMinSec(elapsedMilliseconds);
      };
    }

//start button functionality when clicked sets the initial time and starts the counting up function
startButton.addEventListener('click', () => {
   if (timerRunning == false){
    timerRunning = true;
   grabTime = Date.now();
   int += setInterval(updateTime, 100);
   };
   });

//stop button functionality when clicked stops the counting up function and displayes the existing count
stopButton.addEventListener('click', () => {
    clearInterval(int);
    pausedTime = elapsedMilliseconds;
    timerRunning = false;
    
});

// reset button functionality when clicked resets all data and displays the current status
resetButton.addEventListener('click', () => {
    timerRunning = false;
    int = null;
    elapsedMilliseconds = 0;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    pausedTime = 0;
    timer.textContent =  `${pad(minutes)} : ${pad(seconds)} : ${pad(milliseconds)}`;
    theTime.appendChild(timer);
});

