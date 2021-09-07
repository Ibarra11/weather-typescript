import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherView from './components/WeatherView/WeatherView';
import SearchForm from './components/SearchForm/SearchForm';
import { CurrentWeather, ForecastDay, WeatherDay, WeatherHour, WeatherApiResponse } from './types';
import { getDay, getHourlyWeatherByDate } from './util';
import './App.css';
import axios from 'axios';

const MY_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json?key=';

function App() {
  const [url, setUrl] = useState<string>('');
  const [weatherList, setWeatherList] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>();
  const [data, loading] = useFetch<WeatherApiResponse>(url);
  const [location, setLocation] = useState('');
  const [hourlyCurrentWeather, setHourlyCurrentWeather] = useState<WeatherHour[] | undefined>([]);

  useEffect(() => {
    console.log(data);
    if (data) {
      const {
        current,
        location,
        forecast: { forecastday },
      } = data;
      setWeatherList(forecastday);
      setCurrentWeather({ ...current });
      setHourlyCurrentWeather(forecastday[0].hour);
    }
  }, [data]);

  // async function requestForecast() {
  //   const res = await axios.get(`${BASE_URL}${MY_KEY}&Q=${location}&days=7&aqi=no&alerts=no`);

  //   const { forecastday: forecast }: { forecastday: ForecastDay[] } = res.data.forecast;
  //   const { current }: { current: CurrentWeather } = res.data;
  //   console.log(current);
  //   console.log(forecast);
  //   // const currentDay = getDay(current.last_updated);

  //   // const hourlyWeatherCurrentDay = getHourlyWeatherByDate(forecast, currentDay);

  //   const { name, region } = res.data.location;

  //   setWeatherList(forecast);
  //   setCurrentWeather({ ...current, location: name + ',' + region });
  //   setHourlyCurrentWeather(forecast[0].hour);
  // }

  const handleForecastChange = (forecastDay: WeatherDay) => {
    const { avgtemp_c: temp_c, avgtemp_f: temp_f, condition } = forecastDay;
    setCurrentWeather({ temp_c, temp_f, condition, location });
  };
  return (
    <div className="App">
      <Sidebar weatherList={weatherList} handleForecastChange={handleForecastChange} />
      <SearchForm
        setUrl={setUrl}
        location="Turlock"
        placeholder="Search Location"
        onChange={'hello'}
        type="text"
      />
      <WeatherView
        updateLocation={setLocation}
        currentWeather={currentWeather}
        hourlyCurrentWeather={hourlyCurrentWeather}
      />
    </div>
  );
}

export default App;
