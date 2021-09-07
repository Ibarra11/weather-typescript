import React from 'react';
import '../../styles/Sidebar.css';
import WeatherList from '../WeatherList/WeatherList';
import { ForecastDay, WeatherDay } from '../../types';
const Sidebar = (props: {
  weatherList: ForecastDay[];
  handleForecastChange: (forecastDay: WeatherDay) => void;
}) => {
  return (
    <div className="Sidebar">
      <WeatherList {...props} />
    </div>
  );
};

export default Sidebar;
