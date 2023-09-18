import React, { useEffect, useState } from "react";

import style from "./Quote.module.css";

function Quote() {
    const [quote, setQuote] = useState({
        text: "",
        author: "",
    });

    useEffect(() => {
        async function fetchQuote() {
            try {
                const response = await fetch("https://type.fit/api/quotes");
                if (!response.ok) {
                    throw new Error("Error");
                }
                const quotes = await response.json();

                const randomIndex = Math.floor(
                    Math.random() * quotes.length
                );
                const randomQuote = quotes[randomIndex];

                const author = randomQuote.author.split(",");
                const newAuthor = author[0].trim();

                setQuote({
                    text: randomQuote.text,
                    author: newAuthor,
                });
            } catch (error) {
                console.error("Error fetching quote:", error);
            }
        }

        fetchQuote();
    }, []);

    return (
        <div>
            <p className={style.Quote}>
                "{quote.text}" <br />- {quote.author}
            </p>
        </div>
    );
}

export default Quote;
