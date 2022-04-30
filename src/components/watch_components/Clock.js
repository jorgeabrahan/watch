import { useState } from "react";

export default function Clock() {
    const date = new Date();
    const weekDays = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const weekDay = weekDays[date.getDay()];
    const monthDay = date.getDate();
    const year = date.getFullYear();
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const month = months[date.getMonth()];

    const [time, setTime] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    window.setInterval(() => {
        setTime({
            hours: date.getHours().toString(),
            minutes: date.getMinutes().toString(),
            seconds: date.getSeconds().toString()
        })
    }, 1000);


    const addZeros = (time) => time.length < 2 ? `0${time}` : time;

    return (
        <div className="clock__screen clock">
            <p className="time">
                {`${addZeros(time.hours)}:${addZeros(time.minutes)}:${addZeros(time.seconds)}`}
            </p>
            <p>{`${weekDay} ${monthDay} de ${month} del ${year}`}</p>
        </div>
    );
}