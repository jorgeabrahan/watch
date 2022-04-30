import { useEffect, useState } from "react";

export default function Clock() {

    const [date, setDate] = useState('');

    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    
    useEffect(() => {
        const date = new Date();
        const weekDays = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        const weekDay = weekDays[date.getDay()];
        const monthDay = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        setDate(`${weekDay} ${monthDay} de ${month} del ${year}`);

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        setTime({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
        
        setInterval(() => {
            if (seconds < 59) seconds += 1;
            else if (minutes < 59) {
                minutes += 1;
                seconds = 0;
            }
            else if (hours < 24){
                hours += 1;
                minutes = 0;
                seconds = 0;
            } else {
                hours = 0;
                minutes = 0;
                seconds = 0;
            }
            setTime({
                hours: hours,
                minutes: minutes,
                seconds: seconds
            });
        }, 1000);

    }, []);



    const addZeros = (time) => time.toString().length < 2 ? `0${time}` : time;

    return (
        <div className="clock__screen clock">
            <p className="time">
                {`${addZeros(time.hours)}:${addZeros(time.minutes)}:${addZeros(time.seconds)}`}
            </p>
            <p>{`${date}`}</p>
        </div>
    );
}