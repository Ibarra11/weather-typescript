import React, { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import WeatherView from './components/WeatherView/WeatherView';
import SearchInput from './components/SearchInput/SearchInput';
import useLocalStorage from './hooks/useLocalStorage';
import WeatherList from './components/WeatherList/WeatherList';
import Loader from 'react-loader-spinner';
import {
  CurrentWeather,
  ForecastDay,
  WeatherDay,
  WeatherHour,
  WeatherApiResponse,
  Location,
} from './types';

import './App.css';

function App() {
  const [weatherList, setWeatherList] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>();
  const [location, setLocation] = useState<Location | null>(null);
  const [hourlyCurrentWeather, setHourlyCurrentWeather] = useState<WeatherHour[] | undefined>([]);
  const [weatherData, setWeatherData] = useLocalStorage<WeatherApiResponse | string>(
    'weatherData',
    '',
  );

  useEffect(() => {
    if (typeof weatherData === 'object') {
      const {
        current,
        forecast: { forecastday },
        location,
      } = weatherData;
      setWeatherList(forecastday);
      setCurrentWeather({ ...current, location: `${location.name}, ${location.region}` });
      setHourlyCurrentWeather(forecastday[0].hour);
      setLocation(location);
    }
  }, [weatherData]);

  const handleForecastChange = (forecastDay: WeatherDay) => {
    const { avgtemp_c: temp_c, avgtemp_f: temp_f, condition } = forecastDay;
    if (location) {
      setCurrentWeather({
        temp_c,
        temp_f,
        condition,
        location: `${location.name}, ${location.region}`,
      });
    }
  };
  return (
    <div className="App">
      <Sidebar>
        <WeatherList weatherList={weatherList} handleForecastChange={handleForecastChange} />
      </Sidebar>
      <SearchInput
        setWeatherData={setWeatherData}
        placeholder={location ? location : 'Enter Location'}
        type="text"
      />
      <WeatherView currentWeather={currentWeather} hourlyCurrentWeather={hourlyCurrentWeather} />
      {/* {status === 'pending' ? <Loader type="Rings" color="#00BFFF" height={80} width={80} /> : null} */}
    </div>
  );
}

export default App;
