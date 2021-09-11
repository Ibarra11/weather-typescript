import React from 'react';
import '../../styles/WeatherView.css';
import { CurrentWeather, WeatherHour } from '../../types';

import WeatherHourCarousel from '../WeatherHourCarousel/WeatherHourCarousel';
const WeatherView = ({
  currentWeather,

  hourlyCurrentWeather = [],
}: {
  currentWeather: CurrentWeather | undefined;

  hourlyCurrentWeather: WeatherHour[] | undefined;
}) => {
  let icon, temp_c, temp_f, text, last_updated;
  console.log(currentWeather);
  function displayWeather() {
    const {
      condition: { icon, text },
      temp_c,
      temp_f,
      location,
    } = currentWeather!;
    return (
      <div className="WeatherView-data">
        <p className="WeatherView-location">{location}</p>
        <div className="WeatherView-current">
          <div className="WeatherView-temp">
            <img className="WeatherView-temp-icon" src={icon} alt="weather-icon" />
            <p className="WeatherView-temp-description">{temp_f}</p>
            <div className="WeatherView-temp-degrees">
              <span>C</span>
              <span>F</span>
            </div>
          </div>
          <div className="WeatherView-condition">
            <p>Rain</p>
            <p>Updated 11:23 AM</p>
          </div>
        </div>
        <div className="WeatherView-carousel">
          {hourlyCurrentWeather.length > 0 && (
            <WeatherHourCarousel hourlyWeather={hourlyCurrentWeather} />
          )}
        </div>
      </div>
    );
  }
  return <div className="WeatherView">{currentWeather ? displayWeather() : null}</div>;
};

export default WeatherView;
