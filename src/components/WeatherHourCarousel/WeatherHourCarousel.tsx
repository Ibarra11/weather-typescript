import React, { useState } from 'react';
import { WeatherHour } from '../../types';
import WeatherCard from '../WeatherCard/WeatherCard';
import '../../styles/WeatherHourCarousel.css';
const WeatherHourCarousel = ({ hourlyWeather }: { hourlyWeather: WeatherHour[] }) => {
  const [carouselMinIndex, setCarouselMinIndex] = useState(0);
  const [carouselMaxIndex, setCarouselMaxIndex] = useState(carouselMinIndex + 8);
  function displayCarouselItems() {
    const results = [];
    for (let i = carouselMinIndex; i < carouselMaxIndex; i++) {
      results.push(<WeatherCard {...hourlyWeather[i]} />);
    }
    return results;
  }
  return (
    <div className="WeatherHourCarousel">
      {displayCarouselItems()}
      <div className="WeatherHourCarousel-buttons">
        <button>left</button>
        <button>Right</button>
      </div>
    </div>
  );
};

export default WeatherHourCarousel;
