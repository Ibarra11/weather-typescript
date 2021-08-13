import React from 'react';
import { WeatherListType } from '../../types';
import '../../styles/WeatherItem.css';
const WeatherItem = ({
  date,
  day,
  hour,
  currWeatherId,
}: WeatherListType & { currWeatherId: number | undefined }) => {
  console.log(day);
  console.log(date);
  console.log(hour);
  console.log(currWeatherId);
  const { icon } = day.condition;
  const { avgtemp_f, avgtemp_c } = day;
  return (
    <div className="WeatherItem">
      <img className="WeatherItem-icon" src={`https:${icon}`} alt="weather icon" />

      <div className="WeatherItem-data">
        <div className="WeatherItem-data-date">
          <p>{date}</p>
        </div>
        <div className="WeatherItem-data-temperature">
          <p>{avgtemp_f}</p>
          <div className="Weather-item-data-temperature-selection">
            <p>C</p>
            <p>F</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherItem;
