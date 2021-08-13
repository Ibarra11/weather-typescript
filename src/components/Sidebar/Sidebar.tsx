import React from 'react';
import '../../styles/Sidebar.css';
import WeatherList from '../WeatherList/WeatherList';
import { WeatherListType } from '../../types';
const Sidebar = (props: { weatherList: WeatherListType[]; currRefHour?: number }) => {
  console.log(props);
  return (
    <div className="Sidebar">
      <WeatherList weatherList={props.weatherList} currWeatherId={props.currRefHour} />
    </div>
  );
};

export default Sidebar;
