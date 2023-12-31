class Clock
{
    constructor(object, time, session)
    {   // time is in minutes
        this._object = object;
        this._time = time * 60; // this value will change
        this._initialTime = this._time; // this will not
        this._isRunning = false;
        this._session = session;
        this._timer;
    }

    setTime(newtime){this._time = newtime}
    getTime(){return this._time}
    running(){return this._isRunning}

    formatTime(num)
    {
        const minutes = Math.floor(num / 60);
        const seconds = num % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    stop()
    {
        clearInterval(this._timer);
        this._time = this._initialTime;
        this._object.innerText = this.formatTime(this._time);
        this._isRunning = false;
    }
}

export class Pomodoro extends Clock
{
    constructor(object, time, breakTime, session)
    {
        super(object, time, session);
        this._breakTime = breakTime * 60;
        this._mode = 'work';
        this._object.innerText = this.formatTime(this._time);
    }

    setBreakTime(newBreak){this._breakTime = newBreak}

    updateTimer(amount)
    {
        let newtime = this._time += amount*60;
        this._initialTime = newtime;
        this._time = newtime;
        this._object.innerText = this.formatTime(newtime);
    }

    start()
    {
        this._isRunning = true;
        this._timer = setInterval(() => {
            this._time--;
            this._object.innerText = this.formatTime(this._time);
            if (this._time === 0)
            {
                this.stop()
                if (this._mode == 'work')
                {
                    this._session.innerText = parseInt(this._session.innerText) + Math.floor(this._time / 60);
                    this._object.innerText = this.formatTime(this._breakTime);
                    this._time = this._breakTime;
                    this._object.classList.add('break');
                    this._mode = 'break';
                }
                else{
                    this._time = this._initialTime;
                    this._object.classList.remove('break');
                    this._mode = 'work';
                }
            }
        }, 1000);
    }
}

export class Stopwatch extends Clock
{
    constructor(object, session){
        super(object, session);
        this._time = 0;
        this._initialTime = 0;
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
