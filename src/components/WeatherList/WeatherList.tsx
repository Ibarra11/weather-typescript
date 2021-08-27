import React, { useState, useEffect } from 'react';
import WeatherItem from '../WeatherItem/WeatherItem';
import { ForecastDay } from '../../types';
const WeatherList = (props: { weatherList: ForecastDay[] }) => {
  return (
    <div>
      {props.weatherList.map((weatherData: ForecastDay) => (
        <WeatherItem {...weatherData} />
      ))}
    </div>
  );
};

export default WeatherList;
