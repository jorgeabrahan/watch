import { useState } from "react";

export default function Counter() {

    const [counter, setCounter] = useState(0);

    function addCounter() {
        setCounter(prevCounter => prevCounter + 1);
    }
    function subtractCounter() {
        setCounter(prevCounter => prevCounter - 1);
    }

    return (
        <div className="counter clock__screen">
            <p className="time">{counter}</p>
            <div className="screen__buttons">
                <button className="screen__button counter__button" onClick={subtractCounter}><span className="material-icons counter__icon pe-none">remove</span></button>
                <button className="screen__button counter__button" onClick={addCounter}><span className="material-icons counter__icon pe-none">add</span></button>
            </div>
        </div>
    );
}