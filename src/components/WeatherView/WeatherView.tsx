import React from 'react';
import '../../styles/WeatherView.css';
import { CurrentWeather, WeatherHour } from '../../types';
import SearchForm from '../SearchForm/SearchForm';
import WeatherCard from '../WeatherCard/WeatherCard';
import WeatherHourCarousel from '../WeatherHourCarousel/WeatherHourCarousel';
const WeatherView = ({
  currentWeather,
  updateLocation,
  hourlyCurrentWeather,
}: {
  currentWeather: CurrentWeather | undefined;
  updateLocation: React.Dispatch<React.SetStateAction<string>>;
  hourlyCurrentWeather: WeatherHour[] | undefined;
}) => {
  let icon, temp_c, temp_f, text, last_updated;

  function displayWeather() {
    const {
      condition: { icon, text },
      temp_c,
      temp_f,
      last_updated,
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
          {/* {hourlyCurrentWeather &&
            hourlyCurrentWeather.map((weatherHour) => {
              return <WeatherCard {...weatherHour} />;
            })} */}
          {hourlyCurrentWeather && <WeatherHourCarousel hourlyWeather={hourlyCurrentWeather} />}
        </div>
      </div>
    );
  }
  return (
    <div className="WeatherView">
      <SearchForm
        updateLocation={updateLocation}
        location="Turlock"
        placeholder="Search Location"
        onChange={'hello'}
        type="text"
      />
      {currentWeather ? displayWeather() : null}
    </div>
  );
};

export default WeatherView;
