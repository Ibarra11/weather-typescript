import React, { useEffect, useState } from 'react';
import '../../styles/SearchInput.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import AutoCompleteDropdown from '../AutoCompleteDropdown/AutoCompleteDropdown';
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
  const { data, error, isLoading } = useFetch<AutoCompleteSuggestion[] | WeatherApiResponse>(url);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (isLoading === false) {
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        if (data) {
          setWeatherData(data);
        }
      }
    } else if (error) {
      setInputValue('');
      setWeatherData('');
    }
  }, [data, setWeatherData, isLoading]);

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
        <AutoCompleteDropdown
          suggestions={suggestions}
          handleCityWeatherRequest={handleCityWeatherRequest}
        />
      </div>
      <button onClick={() => handleCityWeatherRequest(inputValue)} className="SearchInput-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchInput;
