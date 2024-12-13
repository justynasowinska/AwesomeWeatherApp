import { StyleSheet } from 'react-native';

import { List } from 'react-native-paper';

import { WeatherCity } from 'types/openWeather';

interface SearchResultItemProps {
  city: WeatherCity;
  onPress: () => void;
}

const SearchResultItem = ({ city, onPress }: SearchResultItemProps) => {
  return (
    <List.Item
      title={`${city.name}, ${city.sys.country}`}
      description={`Lat: ${city.coord.lat}, Lon: ${city.coord.lon}`}
      accessibilityRole="button"
      accessibilityLabel={`${city.name}, ${city.sys.country}`}
      onPress={onPress}
      style={styles.listItem}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 16,
  },
});

export default SearchResultItem;
