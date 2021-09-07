import React, { useState, useEffect } from 'react';
import WeatherItem from '../WeatherItem/WeatherItem';
import { ForecastDay, WeatherDay } from '../../types';
const WeatherList = ({
  weatherList,
  handleForecastChange,
}: {
  weatherList: ForecastDay[];
  handleForecastChange: (forecastDay: WeatherDay) => void;
}) => {
  return (
    <div>
      {weatherList.map((weatherData: ForecastDay) => (
        <WeatherItem handleForecastChange={handleForecastChange} {...weatherData} />
      ))}
    </div>
  );
};

export default WeatherList;
