import { useState } from "react";
import clockAlarm from '../../audio/clock.mp3';
export default function Timer() {
    let audio = new Audio(clockAlarm);

    const [timerData, setTimerData] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerInterval, setTimerInterval] = useState(0);

    function handleChange({ target }) {
        const { name } = target;
        //If user type a letter, it'll be removed
        target.value = isNaN(Number(target.value)) ? target.value.slice(0, target.value.length - 1) : target.value;
        //For minutes and seconds 60 is the limit
        if (name !== 'hours') target.value = Number(target.value) > 60 ? target.value.slice(0, target.value.length - 1) : target.value;

        setTimerData(prevTimerData => {
            return {
                ...prevTimerData,
                [name]: Number(target.value),
            }
        });
    }

    function startTimer({ hours, minutes, seconds }) {
        const intervalId = setInterval(() => {
            if (seconds !== 0) seconds -= 1;
            else if (seconds === 0) {
                if (minutes !== 0) minutes -= 1;
                else if (hours !== 0) {
                    hours -= 1;
                    minutes = 60;
                }
                seconds = 59;
            }

            setTimerData({
                hours: hours,
                minutes: minutes,
                seconds: seconds
            });

            if (hours === 0 && minutes === 0 && seconds === 0) {
                stopTimer(intervalId);
                audio.play();
            }
        }, 1000);
        setTimerInterval(intervalId);
    }

    function timerSubmit(e) {
        e.preventDefault();
        if (timerData.hours === 0 && timerData.minutes === 0 && timerData.seconds === 0) return
        setTimerStarted(true);
        startTimer(timerData);
    }
    
    function stopTimer(intervalToClear) {
        clearInterval(intervalToClear);
        setTimerStarted(false);
    }

    function resetTimer() {
        stopTimer(timerInterval);
        setTimerData({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
    }

    const addZeros = (time) => time.length < 2 ? `0${time}` : time;

    return (
        <div className="timer clock__screen">
            <p className="time">
                {`${addZeros(timerData.hours.toString())}:${addZeros(timerData.minutes.toString())}:${addZeros(timerData.seconds.toString())}`}
            </p>
            <form onSubmit={timerSubmit} className="timer__form">
                {/* Just show inputs when timer has started */}
                {!timerStarted &&
                    <div className="timer__inputs">
                        <div className="timer__group">
                            <input
                                className="timer__input"
                                type="text"
                                placeholder="00"
                                required
                                name="hours"
                                onChange={handleChange}
                                value={timerData.hours}
                            />
                            <span className="details timer__details">Hours</span>
                        </div>
                        <span><b>:</b></span>
                        <div className="timer__group">
                            <input
                                className="timer__input"
                                type="text"
                                placeholder="00"
                                required
                                name="minutes"
                                onChange={handleChange}
                                value={timerData.minutes}
                            />
                            <span className="details timer__details">Minutes</span>
                        </div>
                        <span><b>:</b></span>
                        <div className="timer__group">
                            <input
                                className="timer__input"
                                type="text"
                                placeholder="00"
                                required
                                name="seconds"
                                onChange={handleChange}
                                value={timerData.seconds}
                            />
                            <span className="details timer__details">Seconds</span>
                        </div>
                    </div>
                }
                <div className="screen__buttons">
                    <button className="screen__button timer__button timer__button--reset" type="button" onClick={resetTimer}>Reset</button>
                    {timerStarted &&
                        <button className="screen__button timer__button timer__button--start" type="button" onClick={() => stopTimer(timerInterval)}>Stop</button>
                    }
                    {!timerStarted &&
                        <button className="screen__button timer__button timer__button--start">Start</button>
                    }
                </div>
            </form>
        </div>
    );
}