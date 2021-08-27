import React from 'react';
import '../../styles/WeatherView.css';
import { CurrentWeather } from '../../types';
import SearchForm from '../SearchForm/SearchForm';
const WeatherView = ({ currentWeather }: { currentWeather: CurrentWeather | undefined }) => {
  let icon, temp_c, temp_f, text, last_updated;

  function displayWeather() {
    const {
      condition: { icon, text },
      temp_c,
      temp_f,
      last_updated,
    } = currentWeather!;
    return (
      <div className="WeatherView-data">
        <p className="WeatherView-location">Turlock, California</p>
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
        <div className="WeatherView-hourly">
          <p>Hourly</p>
        </div>
      </div>
    );
  }
  return (
    <div className="WeatherView">
      <SearchForm location="Turlock" placeholder="Search Location" onChange={'hello'} />
      {currentWeather ? displayWeather() : null}
    </div>
  );
};

export default WeatherView;
