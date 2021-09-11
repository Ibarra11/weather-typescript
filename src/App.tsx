import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherView from './components/WeatherView/WeatherView';
import SearchForm from './components/SearchForm/SearchForm';
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
  // const [url, setUrl] = useState<string>('');
  const [weatherList, setWeatherList] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>();
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | undefined>();
  // const [data, status] = useFetch<WeatherApiResponse>(url);
  const [location, setLocation] = useState<Location | null>();
  const [hourlyCurrentWeather, setHourlyCurrentWeather] = useState<WeatherHour[] | undefined>([]);

  useEffect(() => {
    console.log(weatherData);
    if (weatherData) {
      console.log(weatherData);
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

    // if (data) {
    //   const {
    //     current,
    //     location,
    //     forecast: { forecastday },
    //   } = data;
    //   setWeatherList(forecastday);
    //   setCurrentWeather({ ...current, location: `${location.name}, ${location.region}` });
    //   setHourlyCurrentWeather(forecastday[0].hour);
    //   setLocation(location);
    // }
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
      <Sidebar weatherList={weatherList} handleForecastChange={handleForecastChange} />
      <SearchForm setWeatherData={setWeatherData} placeholder="Search Location" type="text" />
      <WeatherView currentWeather={currentWeather} hourlyCurrentWeather={hourlyCurrentWeather} />
      {/* {status === 'pending' ? <Loader type="Rings" color="#00BFFF" height={80} width={80} /> : null} */}
    </div>
  );
}

export default App;
