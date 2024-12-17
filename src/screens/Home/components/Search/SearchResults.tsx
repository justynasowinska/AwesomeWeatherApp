import { FlatList, StyleSheet, View } from 'react-native';

import { Divider, useTheme } from 'react-native-paper';

import { WeatherCity } from 'types/openWeather';

import SearchResultsEmpty from './SearchResultsEmpty';
import SearchResultsError from './SearchResultsError';
import SearchResultsItem from './SearchResultsItem';

interface SearchResultsDropdownProps {
  data: WeatherCity[];
  error: Error | null;
  onCitySelect: (city: WeatherCity) => void;
}

const SearchResultsDropdown = ({
  data,
  error,
  onCitySelect,
}: SearchResultsDropdownProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.dropdown,
        { backgroundColor: colors.background, borderColor: colors.surface },
      ]}
      testID="search-results">
      {error ? (
        <SearchResultsError error={error} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <SearchResultsItem city={item} onPress={onCitySelect} />
          )}
          ListEmptyComponent={<SearchResultsEmpty />}
          ItemSeparatorComponent={Divider}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Search results list"
          accessibilityHint="Select a city from the list to see its weather forecast"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 400,
    zIndex: 1000,
  },
});

export default SearchResultsDropdown;
