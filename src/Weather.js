import React, { useEffect, useState } from "react";
import { WiCloudy, WiDaySunny, WiRain, WiSnow } from "react-icons/wi";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const apiKey = process.env.REACT_APP_API_WEATHER_KEY;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeather();
    }, [apiKey]);

    const getWeatherIcon = (weatherCode) => {
        switch (weatherCode) {
            case "01d":
                return <WiDaySunny />;
            case "01n":
                return <WiDaySunny />;
            case "02d":
                return <WiCloudy />;
            case "02n":
                return <WiCloudy />;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return <WiCloudy />;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return <WiRain />;
            case "13d":
            case "13n":
                return <WiSnow />;
            default:
                return null;
        }
    };
    return (
        <>
            {weather ? (
                <>
                    <p>Boston</p>
                    <p>{(weather.main.temp - 273.15).toFixed(0)}°C</p>
                    <p>{getWeatherIcon(weather.weather[0].icon)}</p>
                    <p>{weather.main.humidity}%</p>
                    <p>{((weather.wind.speed * 3.6).toFixed(0))}km/h</p>
                </>
            ) : (
                <p>Loading weather...</p>
            )}
        </>
    );
};

export default Weather;
