import React, { useEffect, useState } from 'react';
import '../../styles/SearchForm.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  CurrentWeather,
  ForecastDay,
  Location,
  WeatherApiResponse,
  Status,
  AutoCompleteSuggestion,
} from '../../types';
const { REACT_APP_API_KEY: key, REACT_APP_FORECAST_URL: baseUrl } = process.env;

const SearchForm = ({
  type = 'text',
  placeholder = 'turlock',
  setWeatherData,
}: {
  type: string;
  placeholder: string;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherApiResponse | undefined>>;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [url, setUrl] = useState('');
  const [suggestions, setSuggestions] = useState<AutoCompleteSuggestion[]>([]);
  const [autoCompleteDropdown, setAutoCompleteDropdown] = useState<true | false>(false);
  const [data, status] = useFetch<AutoCompleteSuggestion[] | WeatherApiResponse>(url);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // const searchRequest = async (value: string) => {
  //   let results: string[];
  //   const response = await axios.get(
  //     `http://api.weatherapi.com/v1/search.json?key=${key}&q=${inputValue}`,
  //   );
  //   if (response.data.length > 0) {
  //     results = response.data.map((location: { name: string }) => location.name);
  //     setSuggestions(results);
  //     setAutoCompleteDropdown(true);
  //   }
  // };

  // In this case, on

  useEffect(() => {
    if (status === 'resolved') {
      if (Array.isArray(data)) {
        setSuggestions(data);
        setAutoCompleteDropdown(true);
      } else {
        setWeatherData(data);
        setAutoCompleteDropdown(false);
      }
    }
  }, [status]);

  useEffect(() => {
    if (inputValue.length > 2) {
      setUrl(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${inputValue}`);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  function handleCityWeatherRequest(location: string) {
    if (baseUrl && key) {
      setUrl(`${baseUrl + key}&Q=${location}&days=7&aqi=no&alerts=no`);
      // setUrl(
      //   'http://api.weatherapi.com/v1/forecast.json?key=e1921aabbfba4176be370722212408&q=London&days=7&aqi=no&alerts=no',
      // );
    }
  }

  // function handleUrlRequest(location: string) {
  //   console.log(data);
  //   console.log(location);
  //   // const url = `${baseUrl + key!}&Q=${location}&days=7&aqi=no&alerts=no`;
  //   // setUrl(
  //   //   'http://api.weatherapi.com/v1/forecast.json?key=e1921aabbfba4176be370722212408&q=Turlock, California, United States of America&days=10&aqi=no&alerts=no',
  //   // );
  //   setAutoCompleteDropdown(false);
  // }

  return (
    <div className="SearchForm">
      <div className="SearchForm-group">
        <input
          className="SearchForm-input"
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        {autoCompleteDropdown && (
          <ul className="SearchForm-suggestions">
            {suggestions.map((suggestion) => {
              return (
                <li key={suggestion.id} onClick={() => handleCityWeatherRequest(suggestion.name)}>
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button className="SearchForm-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchForm;
