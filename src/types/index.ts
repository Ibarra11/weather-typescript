export type CurrentWeather = {
  condition: { text: string; icon: string; code: number };
  last_updated: string;
  temp_c: number;
  temp_f: number;
};

export type WeatherListType = {
  date: string;
  date_epoch: number;
  day: WeatherDay;
  hour: WeatherHour[];
};

export type WeatherDay = {
  avgtemp_c: number;
  avgtemp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
};

export type WeatherHour = {
  condition: { text: string; icon: string };
  is_day: number;
  temp_c: number;
  temp_f: number;
  time: string;
  time_epoch: number;
};

export type Degrees = {
  degree: 'F' | 'C';
};

export type ForecastDay = {
  date: string;
  day: WeatherDay;
  hour: WeatherHour[];
};
