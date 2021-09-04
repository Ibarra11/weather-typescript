import React, { useState } from 'react';
import { WeatherHour } from '../../types';
import WeatherCard from '../WeatherCard/WeatherCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import '../../styles/WeatherHourCarousel.css';
const WeatherHourCarousel = ({ hourlyWeather }: { hourlyWeather: WeatherHour[] }) => {
  console.log(hourlyWeather);
  const [carouselMinIndex, setCarouselMinIndex] = useState(0);
  const [carouselMaxIndex, setCarouselMaxIndex] = useState(carouselMinIndex + 8);
  function displayCarouselItems() {
    const results = [];
    for (let i = carouselMinIndex; i < carouselMaxIndex; i++) {
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
        <button
          className="WeatherHourCarousel-btn-left"
          data-direction="left"
          onClick={handleCarouselClick}
        >
          <FontAwesomeIcon className="WeatherHourCarousel-icon" icon={faCaretLeft} />
        </button>
        <button
          className="WeatherHourCarousel-btn-right"
          data-direction="right"
          onClick={handleCarouselClick}
        >
          <FontAwesomeIcon className="WeatherHourCarousel-icon" icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};

export default WeatherHourCarousel;
