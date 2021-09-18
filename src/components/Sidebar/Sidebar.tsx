import React from 'react';
import '../../styles/Sidebar.css';
import WeatherList from '../WeatherList/WeatherList';
import { ForecastDay, WeatherDay } from '../../types';
const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <div className="Sidebar">{children}</div>;
};

export default Sidebar;
