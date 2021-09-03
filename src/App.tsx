import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherView from './components/WeatherView/WeatherView';
import { CurrentWeather, ForecastDay, WeatherDay, WeatherHour } from './types';
import { getDay, getHourlyWeatherByDate } from './util';
import './App.css';
import axios from 'axios';

const MY_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json?key=';

function App() {
  const [weatherList, setWeatherList] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>();
  const [location, setLocation] = useState('');
  const [hourlyCurrentWeather, setHourlyCurrentWeather] = useState<WeatherHour[] | undefined>([]);
  useEffect(() => {
    requestForecast();
  }, [location]);

  async function requestForecast() {
    const res = await axios.get(`${BASE_URL}${MY_KEY}&Q=${location}&days=7&aqi=no&alerts=no`);

    const { forecastday: forecast }: { forecastday: ForecastDay[] } = res.data.forecast;
    const { current }: { current: CurrentWeather } = res.data;
    const currentDay = getDay(current.last_updated);

    const hourlyWeatherCurrentDay = getHourlyWeatherByDate(forecast, currentDay);
    const { name, region } = res.data.location;

    setWeatherList(forecast);
    setCurrentWeather({ ...current, location: name + ',' + region });
    setHourlyCurrentWeather(hourlyWeatherCurrentDay);
  }
  return (
    <div className="App">
      <Sidebar weatherList={weatherList} />
      <WeatherView
        updateLocation={setLocation}
        currentWeather={currentWeather}
        hourlyCurrentWeather={hourlyCurrentWeather}
      />
    </div>
  );
}

export default App;
