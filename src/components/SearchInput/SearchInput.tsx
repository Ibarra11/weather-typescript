import React, { useEffect, useState } from 'react';
import '../../styles/SearchInput.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WeatherApiResponse, AutoCompleteSuggestion, Location } from '../../types';
const { REACT_APP_API_KEY: key, REACT_APP_FORECAST_URL: baseUrl } = process.env;

const SearchInput = ({
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
  const [autoCompleteDropdown, toggleAutoCompleteDropdown] = useState<true | false>(false);
  const [data, status, error] = useFetch<AutoCompleteSuggestion[] | WeatherApiResponse>(url);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (status === 'resolved') {
      if (Array.isArray(data)) {
        setSuggestions(data);
        toggleAutoCompleteDropdown(true);
      } else {
        if (data) {
          setWeatherData(data);
          toggleAutoCompleteDropdown(false);
        }
      }
    } else if (status === 'rejected') {
      setInputValue('');
      setWeatherData('');
    }
  }, [data, setWeatherData, status]);

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
    <div className="SearchInput">
      <div className="SearchInput-group">
        <input
          className="SearchInput-input"
          type={type}
          placeholder={
            typeof placeholder === 'string'
              ? 'Enter Location'
              : `${placeholder.name}, ${placeholder.region}`
          }
          value={inputValue}
          onChange={handleInputChange}
        />
        {error && <p className="SearchInput-error">{error}</p>}
        {autoCompleteDropdown && (
          <ul className="SearchInput-suggestions">
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
      <button onClick={() => handleCityWeatherRequest(inputValue)} className="SearchInput-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchInput;
