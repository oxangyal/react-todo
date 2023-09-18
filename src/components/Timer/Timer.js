import React, { useEffect, useState } from "react";

import style from "./Timer.module.css";

function Timer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        let interval;

        if (isActive && (minutes > 0 || seconds > 0)) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        setIsActive(false);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (!isActive && (minutes !== 0 || seconds !== 0)) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, minutes, seconds]);

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className={style.TimerContainer}>
            <div>
                <p className={style.TimerNumbers}>
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                </p>
            </div>
            <div>
                <button
                    onClick={startTimer}
                    disabled={isActive}
                    className={style.Start}
                >
                    Start
                </button>
                <button
                    onClick={stopTimer}
                    disabled={!isActive}
                    className={style.Stop}
                >
                    Stop
                </button>
                <button onClick={resetTimer} className={style.Reset}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Timer;
