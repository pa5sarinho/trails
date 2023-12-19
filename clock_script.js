import {Pomodoro, Stopwatch} from './Clock.js';

const clockObject = document.getElementById("clock-wrapper");
let clockMode = 0; // defaults to pomodoro mode
const preview = document.getElementById("pomo-preview");
const sessionAmount = document.getElementById("total");

let preferences = {
    workTime: 25,
    breakTime: 5
}
let preview_clock;
let clock;

function changeMinusPlusVisibility(to="none")
{
    document.getElementById("preview-minus").style.display = to;
    document.getElementById("preview-plus").style.display = to;
    document.getElementById("minus").style.display = to;
    document.getElementById("plus").style.display = to;
}

function createClock(mode, pomoMin=25, pomoBreak=5)
{
    if (mode == 0)
    {
        clock = new Pomodoro(clockObject, pomoMin, pomoBreak, sessionAmount);
        preview_clock = new Pomodoro(preview, pomoBreak, pomoMin, sessionAmount);
        // the smaller preview clock shows the break time
        changeMinusPlusVisibility("flex");
    }
    else
    {
        clock = new Stopwatch(clockObject, sessionAmount);
        changeMinusPlusVisibility();
    }
}

function changeClock(mode)
{
    clock.stop();
    clockMode = mode;
    createClock(clockMode, preferences.workTime, preferences.breakTime);
    clockObject.classList.remove('break');
}

function halt()
{ // stops the clock and reverts it to the beginning
    if (clockMode == 1)
        sessionAmount.innerText = parseInt(sessionAmount.innerText) + Math.floor(clock.getTime() / 60);
    clock.stop();
    clockObject.classList.remove('break');
}

createClock(clockMode);

document.getElementById("pomodoro-button").addEventListener('click', (event) =>
{
    if (clockMode != 0) changeClock(0);
});

document.getElementById("stopwatch-button").addEventListener('click', (event) =>
{
    if (clockMode != 1)
    {
        while (preview.firstChild) preview.firstChild.remove();
        changeClock(1);
    }
});

document.getElementById("start-button").addEventListener('click', (event) =>
{
    if (!clock.running()) clock.start();
});

document.getElementById("stop-button").addEventListener('click', (event) =>
{
    if (clock.running()) halt();
});

document.getElementById("plus").addEventListener('click', (event) =>
{
    if (!clock.running() && clockMode == 0) clock.updateTimer(5);
    preferences.workTime = clock.getTime()/60;
});

document.getElementById("minus").addEventListener('click', (event) =>
{
    if (!clock.running() && clockMode == 0 && clock.getTime() > 5 * 60) clock.updateTimer(-5);
    preferences.workTime = clock.getTime()/60;
});

document.getElementById("preview-plus").addEventListener('click', (event) =>
{
    if (!clock.running())
    {
        preview_clock.updateTimer(5);
        clock.setBreakTime(preview_clock.getTime());
    }
    preferences.breakTime = preview_clock.getTime()/60;
})

document.getElementById("preview-minus").addEventListener('click', (event) => {
    if (!clock.running() && preview_clock.getTime() > 5 * 60)
    {
        preview_clock.updateTimer(-5);
        clock.setBreakTime(preview_clock.getTime());
    }
    preferences.breakTime = preview_clock.getTime()/60;
})

document.addEventListener('keyup', function(event)
{
    const key = event.key;
    console.log('pressionou', key);

    if (key == ' ' && clock.running()) halt();
});
