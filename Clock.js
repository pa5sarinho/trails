class Clock
{
    constructor(object, time)
    {   // time is in minutes
        this._object = object;
        this._time = time * 60;
        this._isRunning = false;
        this._timer;
    }

    setTime(newtime){this._time = newtime}
    getTime(){return this._time}

    formatTime(num)
    {
        const minutes = Math.floor(num / 60);
        const seconds = num % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    stop()
    {
        clearInterval(this._timer);
        this._isRunning = false;
    }
}

export class Pomodoro extends Clock
{
    constructor(object, time, breakTime)
    {
        super(object, time);
        this._breakTime = breakTime;
        this._timeLeft = time;
        this._object.innerText = this.formatTime(this._time);
    }

    setBreakTime(newBreak){this._breakTime = newBreak}

    updateTimer(amount)
    {
        timer.innerText = formatTime(this._time + amount*60);
        timer.classList.remove('break');
    }

    start(){
        this._isRunning = true;
        this._timer = setInterval(() => {
            this._timeLeft--;
            this._object.innerText = this.formatTime(this._timeLeft);
            if (this._timeLeft === 0)
            {
                clearInterval(this._timer);

                if (this._object.innerText === this.formatTime(this._time))
                {
                    this._timeLeft = this._breakTime;
                    this._object.innerText = this.formatTime(this._breakTime);
                }

                else
                {
                    this._timeLeft = this._time;
                    this._object.innerText = this.formatTime(this._time);
                    this._object.classList.remove('break');
                }
                this._object.classList.toggle('break');
            }
        }, 1000);
    }
}

export class Stopwatch extends Clock
{
    constructor(object){
        super(object);
        this._time = 0;
        this._object.innerText = this.formatTime(this._time);
    }

    start(){
        this._isRunning = true;
        this._timer = setInterval(() => {
            this._time++;
            this._object.innerText = this.formatTime(this._time);
        }, 1000);
    }
}
