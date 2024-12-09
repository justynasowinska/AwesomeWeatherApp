import { FavoritesIcon } from 'components/common/FavoritesIcon';
import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { City } from 'types/openWeather';

interface FavoriteCityItemProps {
  city: City;
  onRemove: (cityId: number) => void;
  onPress: (city: City) => void;
}

const CityIcon = () => <List.Icon icon="city" />;

const FavoriteCityItem = ({
  city,
  onRemove,
  onPress,
}: FavoriteCityItemProps) => {
  const renderFavoritestIcon = () => (
    <FavoritesIcon isFavorite={true} onPress={() => onRemove(city.id)} />
  );

  return (
    <List.Item
      title={`${city.name}, ${city.sys.country}`}
      description={`Lat: ${city.coord.lat}, Lon: ${city.coord.lon}`}
      left={CityIcon}
      right={renderFavoritestIcon}
      style={styles.item}
      onPress={() => onPress(city)}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
    paddingRight: 0,
  },
});

export default FavoriteCityItem;
