import React, { useEffect, useState } from 'react';
import '../../styles/SearchForm.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { WeatherApiResponse, AutoCompleteSuggestion, Location } from '../../types';
const { REACT_APP_API_KEY: key, REACT_APP_FORECAST_URL: baseUrl } = process.env;

const SearchForm = ({
  type = 'text',
  placeholder,
  setWeatherData,
}: {
  type: string;
  placeholder: string | Location;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherApiResponse | string>>;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [url, setUrl] = useState('');
  const [suggestions, setSuggestions] = useState<AutoCompleteSuggestion[]>([]);
  const [autoCompleteDropdown, setAutoCompleteDropdown] = useState<true | false>(false);
  const [data, status] = useFetch<AutoCompleteSuggestion[] | WeatherApiResponse>(url);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // In this case, on

  useEffect(() => {
    if (status === 'resolved') {
      if (Array.isArray(data)) {
        setSuggestions(data);
        setAutoCompleteDropdown(true);
      } else {
        if (data) {
          setWeatherData(data);
          setAutoCompleteDropdown(false);
        }
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
    }
  }

  return (
    <div className="SearchForm">
      <div className="SearchForm-group">
        <input
          className="SearchForm-input"
          type={type}
          placeholder={
            typeof placeholder === 'string'
              ? 'Enter Location'
              : `${placeholder.name}, ${placeholder.region}`
          }
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
