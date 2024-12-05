import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { City } from 'types/openWeather';

interface FavoriteCityItemProps {
  city: City;
  onRemove: (cityId: number) => void;
}

const CityIcon = () => <List.Icon icon="city" />;

const FavoriteCityItem = ({ city, onRemove }: FavoriteCityItemProps) => {
  const renderFavoritestIcon = () => (
    <IconButton icon="heart" onPress={() => onRemove(city.id)} />
  );

  return (
    <List.Item
      title={`${city.name}, ${city.sys.country}`}
      description={`Lat: ${city.coord.lat}, Lon: ${city.coord.lon}`}
      left={CityIcon}
      right={renderFavoritestIcon}
      style={styles.item}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
  },
});

export default FavoriteCityItem;
