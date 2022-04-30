import React, { useState } from 'react';
import Clock from './watch_components/Clock';
import Timer from './watch_components/Timer';
import Stopwatch from './watch_components/Stopwatch';
import Counter from './watch_components/Counter';

export default function Watch() {
    const [clockScreen, setClockScreen] = useState('clock');
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true' ? false : true);

    function showSelectedScreen() {
        let screenToRender;
        switch(clockScreen) {                
            case 'timer':
                screenToRender = <Timer />;
                break;                
            case 'stopwatch':
                screenToRender = <Stopwatch />;
                break;                
            case 'counter':
                screenToRender = <Counter />;
                break;      
            default:
                screenToRender = <Clock />;
                break;
        }
        return screenToRender;
    }

    function toggleDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode);
        localStorage.setItem('darkMode', darkMode);
    }

    function openSettings({target}) {
        if (window.innerWidth < 768) {
            target.lastElementChild.classList.toggle('opacity-toggle');
        }
    }

    return (
        <section className={`watch ${darkMode ? 'watch--dark' : ''}`}>
            <div className="watch__frame">
                <header className='watch__header'>
                    <div className='header__option'><span className="material-icons" onClick={toggleDarkMode}>dark_mode</span></div>
                    <div className='header__option header__settings' onClick={openSettings}>
                        <span className="material-icons">settings</span>
                        <div className="settings__buttons">
                            <button className="settings__button" onClick={() => setClockScreen('clock')}>
                                <span className='details settings__details'>Clock</span>
                                <span className='material-icons'>schedule</span>
                            </button>
                            <button className="settings__button" onClick={() => setClockScreen('timer')}>
                                <span className='details settings__details'>Timer</span>
                                <span className="material-icons">timer</span>
                            </button>
                            <button className="settings__button" onClick={() => setClockScreen('stopwatch')}>
                                <span className='details settings__details'>Stopwatch</span>
                                <span className="material-icons">av_timer</span>
                            </button>
                            <button className="settings__button" onClick={() => setClockScreen('counter')}>
                                <span className='details settings__details'>Counter</span>
                                <span className="material-icons">alarm_add</span>
                            </button>
                        </div>
                    </div>
                </header>
                {showSelectedScreen()}
            </div>
        </section>
    );
}