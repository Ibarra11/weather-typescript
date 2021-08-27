import React from 'react';
import '../../styles/Sidebar.css';
import WeatherList from '../WeatherList/WeatherList';
import { ForecastDay } from '../../types';
const Sidebar = (props: { weatherList: ForecastDay[] }) => {
  console.log(props);
  return (
    <div className="Sidebar">
      <WeatherList weatherList={props.weatherList} />
    </div>
  );
};

export default Sidebar;
