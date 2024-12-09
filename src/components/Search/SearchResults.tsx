import { SearchResultsItem } from 'components/Search';
import { State as SearchState, Status } from 'hooks/useSearchCities';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';
import { WeatherCity } from 'types/openWeather';

interface SearchResultsDropdownProps {
  data: SearchState['data'];
  status: SearchState['status'];
  error: SearchState['error'];
  onCitySelect: (city: WeatherCity) => void;
}

const SearchResultsDropdown = ({
  data,
  status,
  error,
  onCitySelect,
}: SearchResultsDropdownProps) => {
  const { colors } = useTheme();

  const renderContent = () => {
    if (status === Status.FETCHING) {
      return <Text style={styles.message}>Loading...</Text>;
    }

    if (status === Status.ERROR && error) {
      return (
        <Text style={[styles.message, { color: colors.error }]}>
          Error: {error}
        </Text>
      );
    }

    if (status === Status.SUCCESS && data.length === 0) {
      return (
        <Text style={styles.message}>
          No results yet. Keep typing or try something different.
        </Text>
      );
    }

    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <SearchResultsItem city={item} onPress={() => onCitySelect(item)} />
        )}
        ItemSeparatorComponent={Divider}
        keyboardShouldPersistTaps="handled"
        accessibilityLabel="Search results list"
        accessibilityHint="Select a city from the list to see its weather forecast"
        style={styles.list}
      />
    );
  };

  return (
    <View
      style={[styles.dropdown, { backgroundColor: colors.background }]}
      testID="search-results">
      {renderContent()}
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
  list: {
    paddingHorizontal: 8,
  },
  message: {
    textAlign: 'center',
    padding: 16,
  },
});

export default SearchResultsDropdown;
