import React, { useEffect, useState } from 'react';
import '../../styles/SearchForm.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MY_KEY = process.env.REACT_APP_API_KEY;

const SearchForm = ({
  location = 'location',
  type = 'text',
  placeholder = 'turlock',
  onChange = 'd',
  updateLocation,
}: {
  location: string;
  type: string;
  placeholder: string;
  onChange: string;
  updateLocation: React.Dispatch<React.SetStateAction<string>>;
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
      `http://api.weatherapi.com/v1/search.json?key=${MY_KEY}&q=${inputValue}`,
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

  function handleLocationRequest(suggestion: string) {
    setAutoCompleteDropdown(false);
    updateLocation(suggestion);
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
              return <li onClick={() => handleLocationRequest(suggestion)}>{suggestion}</li>;
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
