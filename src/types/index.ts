export type WeatherApiResponse = {
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
  location: Location;
};

export type Location = {
  country: string;
  localtime: string;
  name: string;
  region: string;
};

export type CurrentWeather = {
  condition: { text: string; icon: string; code: number };
  temp_c: number;
  temp_f: number;
  location: string;
};

export type WeatherListType = {
  date: string;
  date_epoch: number;
  day: WeatherDay;
  hour: WeatherHour[];
};

export type WeatherDay = {
  date: string;
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
  temp_c: number;
  temp_f: number;
  time: string;
};

export type Degrees = {
  degree: 'F' | 'C';
};

export type ForecastDay = {
  date: string;
  day: WeatherDay;
  hour: WeatherHour[];
};

export type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

export type AutoCompleteSuggestion = {
  id: number;
  name: string;
};
