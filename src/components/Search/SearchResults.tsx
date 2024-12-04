import { State as SearchState, Status } from 'hooks/useSearchCities';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { WeatherCity } from 'types/openWeather';
import SearchResultItem from './SearchResultsItem';

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
  const renderContent = () => {
    if (status === Status.FETCHING) {
      return <Text style={styles.message}>Loading...</Text>;
    }

    if (status === Status.ERROR && error) {
      return <Text style={[styles.message, styles.error]}>Error: {error}</Text>;
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
          <SearchResultItem city={item} onPress={() => onCitySelect(item)} />
        )}
        ItemSeparatorComponent={Divider}
        style={styles.list}
      />
    );
  };

  return (
    <View style={styles.dropdown} testID="search-results">
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
    backgroundColor: 'white',
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
  error: {
    color: 'red',
  },
});

export default SearchResultsDropdown;
