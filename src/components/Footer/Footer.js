import React from "react";
import style from "../Footer/Footer.module.css";

const Footer = () => {
    const currentDate = new Date().getFullYear();

    return (
        <footer>
            <p className={style.Copyright}>
                &copy; {currentDate} Oxana Michkasova. 
            </p>
        </footer>
    );
};

export default Footer;
