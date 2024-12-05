import useSearchCities, {
  MIN_QUERY_LENGTH,
  Status,
} from 'hooks/useSearchCities';
import debounce from 'lodash.debounce';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { City } from 'types/openWeather';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

interface SearchProps {
  onCitySelect: (city: City) => void;
}

const Search = ({ onCitySelect }: SearchProps) => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const { data, status, error } = useSearchCities(query);

  const debouncedSetQuery = useMemo(
    () => debounce((text: string) => setQuery(text), 300),
    [],
  );

  const handleInputChange = useCallback(
    (text: string) => {
      setInputValue(text);
      debouncedSetQuery(text);
    },
    [debouncedSetQuery],
  );

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    handleClear();
  };

  const handleClear = () => {
    setInputValue('');
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <SearchInput
          value={inputValue}
          onChange={handleInputChange}
          isLoading={status === Status.FETCHING}
          onClear={handleClear}
        />
        {query.length >= MIN_QUERY_LENGTH && (
          <SearchResults
            data={data}
            status={status}
            error={error}
            onCitySelect={handleCitySelect}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
});

export default Search;
