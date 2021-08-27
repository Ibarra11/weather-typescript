import React, { useState } from 'react';
import '../../styles/SearchForm.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const SearchForm = ({
  location = 'location',
  type = 'text',
  placeholder = 'turlock',
  onChange = 'd',
}) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="SearchForm">
      <input
        className="SearchForm-input"
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />

      <button className="SearchForm-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchForm;
