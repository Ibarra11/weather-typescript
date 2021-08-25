import React, { useState, useEffect } from 'react';
import WeatherItem from '../WeatherItem/WeatherItem';
import { WeatherListType } from '../../types';
const WeatherList = (props: { weatherList: WeatherListType[]; currWeatherId?: number }) => {
  return (
    <div>
      {props.weatherList.map((weatherData: WeatherListType) => (
        <WeatherItem {...weatherData} currWeatherId={props.currWeatherId} />
      ))}
    </div>
  );
};

export default WeatherList;
