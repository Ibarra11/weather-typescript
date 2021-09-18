import React, { useEffect, useState } from 'react';
import { AutoCompleteSuggestion } from '../../types';

const AutoCompleteDropdown = ({
  suggestions,
  handleCityWeatherRequest,
}: {
  suggestions: AutoCompleteSuggestion[];
  handleCityWeatherRequest: (url: string) => void;
}) => {
  const [display, toggleDisplay] = useState<boolean>(false);

  useEffect(() => {
    toggleDisplay(true);
    return () => {
      toggleDisplay(false);
    };
  }, [suggestions]);

  const handleSuggestion = (suggestion: string) => {
    handleCityWeatherRequest(suggestion);
    toggleDisplay(false);
  };

  return display ? (
    <ul className="SearchInput-suggestions">
      {suggestions.map((suggestion) => {
        return (
          <li key={suggestion.id} onClick={() => handleSuggestion(suggestion.name)}>
            {suggestion.name}
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default AutoCompleteDropdown;
