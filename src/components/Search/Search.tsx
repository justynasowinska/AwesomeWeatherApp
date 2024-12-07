import { SearchInput, SearchResults } from 'components/Search';
import { Status } from 'hooks/useSearchCities';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { City, WeatherCity } from 'types/openWeather';

interface SearchProps {
  inputValue: string;
  data: WeatherCity[];
  status: Status;
  error: string | null;
  showResults: boolean;
  onInputChange: (value: string) => void;
  onCitySelect: (city: City) => void;
  onInputClear: () => void;
}

const Search = ({
  inputValue,
  data,
  status,
  error,
  showResults,
  onInputChange,
  onCitySelect,
  onInputClear,
}: SearchProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <SearchInput
          value={inputValue}
          onChange={onInputChange}
          isLoading={status === Status.FETCHING}
          onClear={onInputClear}
        />
        {showResults && (
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
    padding: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
});

export default Search;
