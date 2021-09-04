import React, { useState } from 'react';
import { WeatherHour } from '../../types';
import WeatherCard from '../WeatherCard/WeatherCard';
import '../../styles/WeatherHourCarousel.css';
const WeatherHourCarousel = ({ hourlyWeather }: { hourlyWeather: WeatherHour[] }) => {
  console.log(hourlyWeather);
  const [carouselMinIndex, setCarouselMinIndex] = useState(0);
  const [carouselMaxIndex, setCarouselMaxIndex] = useState(carouselMinIndex + 8);
  function displayCarouselItems() {
    const results = [];
    console.log(carouselMinIndex);
    console.log(carouselMaxIndex);
    for (let i = carouselMinIndex; i < carouselMaxIndex; i++) {
      console.log(hourlyWeather[i]);
      results.push(<WeatherCard {...hourlyWeather[i]} />);
    }
    return results;
  }
  function handleCarouselClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { direction } = (e.target as HTMLButtonElement).dataset;
    if (direction === 'right') {
      if (carouselMaxIndex === hourlyWeather.length) {
        setCarouselMinIndex(0);
        setCarouselMaxIndex(8);
      } else {
        setCarouselMinIndex(carouselMaxIndex);
        setCarouselMaxIndex(carouselMaxIndex + 8);
      }
    } else {
      if (carouselMinIndex === 0) {
        setCarouselMinIndex(hourlyWeather.length - 8);
        setCarouselMaxIndex(hourlyWeather.length);
      } else {
        setCarouselMinIndex(carouselMinIndex - 8);
        setCarouselMaxIndex(carouselMinIndex);
      }
    }
  }

  return (
    <div className="WeatherHourCarousel">
      {displayCarouselItems()}
      <div className="WeatherHourCarousel-buttons">
        <button data-direction="left" onClick={handleCarouselClick}>
          left
        </button>
        <button data-direction="right" onClick={handleCarouselClick}>
          Right
        </button>
      </div>
    </div>
  );
};

export default WeatherHourCarousel;
