import React, { useEffect, useState } from "react";

import iconCloudy from "../../assets/cloudy96.png";
import iconHumidity from "../../assets/humidity.png";
import iconRain from "../../assets/rain96.png";
import iconScattered from "../../assets/nosun96.png";
import iconSnow from "../../assets/snow96.png";
import iconSunny from "../../assets/sun96.png";
import iconThunder from "../../assets/thunder96.png";
import iconWind from "../../assets/wind.png";
import style from "./Weather.module.css";

// import { WiCloudy, WiDaySunny, WiRain, WiSnow } from "react-icons/wi";

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
        console.log("weatherCode: " + weatherCode);
        switch (weatherCode) {
            case "01d":
            case "01n":
            case "02d":
            case "02n":
                return (
                    <img
                        src={iconSunny}
                        className={style.WeatherIcon}
                        alt="Sunny"
                    />
                );
            case "03d":
            case "03n":
                return (
                    <img
                        src={iconCloudy}
                        className={style.WeatherIcon}
                        alt="Cloudy"
                    />
                );
            case "04d":
            case "04n":
                return (
                    <img
                        src={iconScattered}
                        className={style.WeatherIcon}
                        alt="Scattered Clouds"
                    />
                );
            case "09d":
            case "09n":
            case "10d":
            case "10n":
            case "50d":
            case "50n":
                return (
                    <img
                        src={iconRain}
                        className={style.WeatherIcon}
                        alt="Rain"
                    />
                );
            case "11d":
            case "11n":
                return (
                    <img
                        src={iconThunder}
                        className={style.WeatherIcon}
                        alt="Thunder"
                    />
                );
            case "13d":
            case "13n":
                return (
                    <img
                        src={iconSnow}
                        className={style.WeatherIcon}
                        alt="Snow"
                    />
                );
            default:
                return null;
        }
    };
    return (
        <>
            {weather ? (
                <>
                    <p className={style.City}>Boston</p>
                    <p className={style.Data}>
                        {(weather.main.temp - 273.15).toFixed(0)}°C
                    </p>
                    <p className={style.Data}>
                        {getWeatherIcon(weather.weather[0].icon)}
                    </p>
                    <div className={style.Features}>
                        <img
                            src={iconHumidity}
                            className={style.WeatherIconA}
                            alt="Humidity"
                        />
                        <p>{weather.main.humidity}%</p>
                        <img
                            src={iconWind}
                            className={style.WeatherIconA}
                            alt="Wind"
                        />
                        <p>{(weather.wind.speed * 3.6).toFixed(0)}km/h</p>
                    </div>
                </>
            ) : (
                    <p>Loading...</p>
                    
            )}
        </>
    );
};

export default Weather;
