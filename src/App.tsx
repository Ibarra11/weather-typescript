import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherView from './components/WeatherView/WeatherView';
import { CurrentWeather, WeatherListType } from './types';
import './App.css';
import axios from 'axios';

const MY_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json?key=';

type WeatherObject = {
  condition: { text: string; icon: string; code: number };
  is_day: number;
  last_updated: string;
  last_updated_epoch: number;
  temp_c: number;
  temp_f: number;
  uv: number;
};

function App() {
  const [weatherList, setWeatherList] = useState<WeatherListType[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({});
  useEffect(() => {
    axios.get(BASE_URL + MY_KEY + '&Q=Turlock&days=2&aqi=no&alerts=no').then((response) => {
      setWeatherList(response.data.forecast.forecastday);
      setCurrentWeather(response.data.current);
    });
  }, []);
  return (
    <div className="App">
      <Sidebar weatherList={weatherList} currRefHour={currentWeather.last_updated_epoch} />
      <WeatherView {...currentWeather} />
    </div>
  );
}

export default App;
