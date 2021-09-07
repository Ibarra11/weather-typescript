import React, { useState } from 'react';
import { Degrees, ForecastDay, WeatherDay } from '../../types';
import '../../styles/WeatherItem.css';
const WeatherItem = ({
  date,
  day,
  hour,
  handleForecastChange,
}: ForecastDay & { handleForecastChange: (forecastDay: WeatherDay) => void }) => {
  const { icon } = day.condition;
  const { avgtemp_f, avgtemp_c } = day;
  const [tempDegree, setTempDegree] = useState<Degrees['degree']>('F');

  const handleDegreeChange = (deg: Degrees['degree']) => {
    setTempDegree(deg);
  };
  return (
    <div className="WeatherItem" onClick={() => handleForecastChange({ ...day })}>
      <img className="WeatherItem-icon" src={`https:${icon}`} alt="weather icon" />

      <div className="flex">
        <div className="WeatherItem-data">
          <p className="WeatherItem-data-date">{date}</p>
          <p className="WeatherItem-data-avgtemp">{tempDegree === 'F' ? avgtemp_f : avgtemp_c}</p>
        </div>
        <div className="WeatherItem-buttons">
          <button
            data-deg="C"
            onClick={() => handleDegreeChange('C')}
            className={`temperature-button ${tempDegree === 'C' ? 'active' : ''}`}
          >
            C
          </button>
          <button
            data-deg="F"
            onClick={() => handleDegreeChange('F')}
            className={`temperature-button ${tempDegree === 'F' ? 'active' : ''}`}
          >
            F
          </button>
        </div>
      </div>
    </div>
  );
};
export default WeatherItem;
