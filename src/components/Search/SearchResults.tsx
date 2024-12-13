import { FlatList, StyleSheet, View } from 'react-native';

import { Divider, Text, useTheme } from 'react-native-paper';

import { SearchResultsItem } from 'components/Search';
import { State as SearchState } from 'hooks/useSearchCities';

import { WeatherCity } from 'types/openWeather';

interface SearchResultsDropdownProps {
  data: SearchState['data'];
  isLoading: boolean;
  error: Error | null;
  onCitySelect: (city: WeatherCity) => void;
}

const SearchResultsDropdown = ({
  data,
  isLoading,
  error,
  onCitySelect,
}: SearchResultsDropdownProps) => {
  const { colors } = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return <Text style={styles.message}>Loading...</Text>;
    }

    if (error) {
      return (
        <Text style={[styles.message, { color: colors.error }]}>
          Error: {error.message || 'An error occurred'}
        </Text>
      );
    }

    if (data.length === 0) {
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
      />
    );
  };

  return (
    <View
      style={[
        styles.dropdown,
        { backgroundColor: colors.background, borderColor: colors.surface },
      ]}
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
  message: {
    textAlign: 'center',
    padding: 16,
  },
});

export default SearchResultsDropdown;
