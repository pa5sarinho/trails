import {Pomodoro, Stopwatch} from './Clock.js';

const clockObject = document.getElementById("clock-wrapper");
//const clockObject = document.createElement('div');
let clockMode = 0; // defaults to pomodoro mode
let clock;

function createClock(mode, pomoMin=25, pomoBreak=5)
{
    if (mode == 0)
    {
        clock = new Pomodoro(clockObject, pomoMin, pomoBreak);
    }
    else
    {
        clock = new Stopwatch(clockObject);
    }
}

function changeClock(mode)
{
    clock.stop();
    clockMode = mode;
    createClock(clockMode);
}

createClock(clockMode, 0.5, 1);

document.getElementById("pomodoro-button").addEventListener('click', (event) => {
    if (clockMode != 0)
    {
        //while (clockWrapper.firstChild) clockWrapper.firstChild.remove();
        changeClock(0);
    }
});

document.getElementById("stopwatch-button").addEventListener('click', (event) => {
    if (clockMode != 1)
    {
        //while (clockWrapper.firstChild) clockWrapper.firstChild.remove();
        changeClock(1);
    }
});

document.getElementById("start-button").addEventListener('click', (event) => {
    clock.start();
});

document.getElementById("stop-button").addEventListener('click', (event) => {
    clock.stop();
});

document.getElementById("plus").addEventListener('click', (event) => {
    if (!clock.running() && clockMode == 0) clock.updateTimer(5);
});

document.getElementById("minus").addEventListener('click', (event) => {
    if (!clock.running() && clockMode == 0 && clock.getTime() >= 5 * 60) clock.updateTimer(-5);
});
