import React from 'react';
import '../../styles/WeatherCard.css';
import { WeatherHour } from '../../types';
const WeatherCard = ({ condition: { icon }, temp_c, temp_f, time }: WeatherHour) => {
  return (
    <div className="WeatherCard">
      <img src={icon} alt="weather_icon" />
      <div className="WeatherCard-date">
        <p>{time}</p>
      </div>
      <div className="WeatherCard-temp">
        <p>{temp_c}</p>
        <p>{temp_f}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
