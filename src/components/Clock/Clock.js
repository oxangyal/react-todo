import React, { useEffect, useState } from "react";

import style from "./Clock.module.css"

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const dayOfWeek = time
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            // year: "numeric",
            hour: "numeric",
            minute: "numeric",
        })
        .replace(" at", ",");

    return <p className={style.Date}>{dayOfWeek}</p>;
};

export default Clock;
