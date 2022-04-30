import { useState } from "react";

export default function Stopwatch() {

    const [stopwatchData, setStopwatchData] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [stopwatchInterval, setStopwatchInterval] = useState(0);

    function startStopwatch({ hours, minutes, seconds }) {
        if (stopwatchInterval !== 0) return;
        const stopwatchIntervalId = setInterval(() => {
            if (seconds < 59) seconds += 1;
            else if (minutes < 59) {
                minutes += 1;
                seconds = 0;
            }
            else {
                hours += 1;
                minutes = 0;
                seconds = 0;
            }
            setStopwatchData({
                hours: hours,
                minutes: minutes,
                seconds: seconds
            });
        }, 1000);
        setStopwatchInterval(stopwatchIntervalId);
    }

    function stopStopwatch() {
        clearInterval(stopwatchInterval);
        setStopwatchInterval(0)
    }

    function resetStopwatch() {
        stopStopwatch()
        setStopwatchData({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
    }
    const addZeros = (time) => time.length < 2 ? `0${time}` : time;
    return (
        <div className="stopwatch clock__screen">
            <p className="time">{`${addZeros(stopwatchData.hours.toString())}:${addZeros(stopwatchData.minutes.toString())}:${addZeros(stopwatchData.seconds.toString())}`}</p>
            <div className="screen__buttons stopwatch__buttons">
                <button
                    className="screen__button stopwatch__button--start"
                    onClick={() => startStopwatch(stopwatchData)}
                >Start</button>    
                <button
                    className="screen__button stopwatch__button--stop"
                    onClick={stopStopwatch}
                >Stop</button>    
                <button
                    className="screen__button stopwatch__button--reset"
                    onClick={resetStopwatch}
                >Reset</button>    
            </div>
        </div>
    );
}