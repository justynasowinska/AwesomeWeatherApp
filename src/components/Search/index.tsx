import useSearchCities, {
  MIN_QUERY_LENGTH,
  Status,
} from 'hooks/useSearchCities';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WeatherCity } from 'types/openWeather';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

interface SearchProps {
  onCitySelect: (city: WeatherCity) => void;
}

const Search = ({ onCitySelect }: SearchProps) => {
  const [query, setQuery] = useState('');
  const { data, status, error } = useSearchCities(query);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <SearchInput
          value={query}
          onChange={setQuery}
          isLoading={status === Status.FETCHING}
          onClear={handleClear}
        />
        {query.length >= MIN_QUERY_LENGTH && (
          <SearchResults
            data={data}
            status={status}
            error={error}
            onCitySelect={onCitySelect}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
});

export default Search;
