import { StyleSheet, View, ViewProps } from 'react-native';

import { City, WeatherCity } from 'types/openWeather';

import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

interface SearchProps extends ViewProps {
  inputValue: string;
  data: WeatherCity[];
  isLoading: boolean;
  error: Error | null;
  showResults: boolean;
  onInputChange: (value: string) => void;
  onCitySelect: (city: City) => void;
  onInputClear: () => void;
}

const Search = ({
  inputValue,
  data,
  isLoading,
  error,
  showResults,
  onInputChange,
  onCitySelect,
  onInputClear,
  ...containerProps
}: SearchProps) => {
  return (
    <View style={styles.container} {...containerProps}>
      <View style={styles.inputWrapper}>
        <SearchInput
          value={inputValue}
          onChange={onInputChange}
          isLoading={isLoading}
          onClear={onInputClear}
        />
        {showResults && (
          <SearchResults
            data={data}
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
