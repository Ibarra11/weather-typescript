import React, { useState } from 'react';
import '../../styles/WeatherCard.css';
import { WeatherHour } from '../../types';
const WeatherCard = ({ condition: { icon }, temp_c, temp_f, time }: WeatherHour) => {
  const [degree, setDegree] = useState<'C' | 'F'>('F');
  function handleDegreeChange(deg: 'C' | 'F') {
    setDegree(deg);
  }

  return (
    <div className="WeatherCard">
      <div className="WeatherCard-img-container">
        <img className="WeatherCard-icon" src={icon} alt="weather image" />
      </div>

      <div className="WeatherCard-date">
        <p>{time}</p>
      </div>
      <div className="WeatherCard-temp">
        <p className="WeatherCard-temp-desc">{degree === 'F' ? temp_f : temp_c}</p>
        <div className="WeatherCard-temp-buttons">
          <button
            className={`WeatherCard-temp-btn ${degree === 'C' ? 'active' : ''}`}
            onClick={() => {
              handleDegreeChange('C');
            }}
          >
            C
          </button>

          <button
            className={`WeatherCard-temp-btn ${degree === 'F' ? 'active' : ''}`}
            onClick={() => handleDegreeChange('F')}
          >
            F
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
