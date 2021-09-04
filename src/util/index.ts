import { ForecastDay } from '../types';

const getDay = (date: string) => {
  return Number(date.split(/[- ]/)[2]);
};

const getHourlyWeatherByDate = (forecastArr: ForecastDay[], date: number) => {
  for (let i = 0; i < forecastArr.length; i++) {
    if (getDay(forecastArr[i].date) === date) {
      return forecastArr[i].hour;
    }
  }
};

export { getDay, getHourlyWeatherByDate };
