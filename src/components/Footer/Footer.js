import React from "react";
import style from "..//Footer/Footer.module.css";

const Footer = () => {
    const currentDate = new Date().getFullYear();

    return (
        <footer>
            <p className={style.Copyright}>
                &copy; {currentDate} Oxana Michkasova. <br />
                All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
