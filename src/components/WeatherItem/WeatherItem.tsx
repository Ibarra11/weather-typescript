import React from 'react';
import { WeatherListType } from '../../types';
import '../../styles/WeatherItem.css';
const WeatherItem = ({
  date,
  day,
  hour,
  currWeatherId,
}: WeatherListType & { currWeatherId: number | undefined }) => {
  const { icon } = day.condition;
  const { avgtemp_f, avgtemp_c } = day;
  return (
    <div className="WeatherItem">
      <img className="WeatherItem-icon" src={`https:${icon}`} alt="weather icon" />

      <div className="flex">
        <div className="WeatherItem-data">
          <p className="WeatherItem-data-date">{date}</p>
          <p className="WeatherItem-data-avgtemp">{avgtemp_f}</p>
        </div>
        <div className="WeatherItem-buttons">
          <button className="temperature-button active">C</button>
          <button className="temperature-button">F</button>
        </div>
      </div>
    </div>
  );
};
export default WeatherItem;
