import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherView from './components/WeatherView/WeatherView';
import { CurrentWeather, ForecastDay, WeatherDay } from './types';
import './App.css';
import axios from 'axios';

const MY_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json?key=';

function App() {
  const [weatherList, setWeatherList] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>();
  const [location, setLocation] = useState('');
  useEffect(() => {
    requestForecast();
  }, [location]);

  async function requestForecast() {
    const res = await axios.get(`${BASE_URL}${MY_KEY}&Q=modesto&days=7&aqi=no&alerts=no`);
    console.log(res);
    const { forecastday }: { forecastday: ForecastDay[] } = res.data.forecast;
    const { current }: { current: CurrentWeather } = res.data;
    setWeatherList(forecastday);
    setCurrentWeather(current);
  }
  return (
    <div className="App">
      <Sidebar weatherList={weatherList} />
      <WeatherView currentWeather={currentWeather} />
    </div>
  );
}

export default App;
