import React, { useEffect, useState } from 'react';
import '../../styles/SearchForm.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { REACT_APP_API_KEY: key, REACT_APP_FORECAST_URL: baseUrl } = process.env;

const SearchForm = ({
  location = 'location',
  type = 'text',
  placeholder = 'turlock',
  onChange = 'd',
  setUrl,
}: {
  location: string;
  type: string;
  placeholder: string;
  onChange: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [autoCompleteDropdown, setAutoCompleteDropdown] = useState<true | false>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const searchRequest = async (value: string) => {
    let results: string[];
    const response = await axios.get(
      `http://api.weatherapi.com/v1/search.json?key=${key}&q=${inputValue}`,
    );
    if (response.data.length > 0) {
      results = response.data.map((location: { name: string }) => location.name);
      setSuggestions(results);
      setAutoCompleteDropdown(true);
    }
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      searchRequest(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  function handleUrlRequest(location: string) {
    console.log(baseUrl);
    const url = `${baseUrl + key!}&Q=${location}&days=7&aqi=no&alerts=no`;
    setUrl(url);
  }

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
              return <li onClick={() => handleUrlRequest(suggestion)}>{suggestion}</li>;
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
