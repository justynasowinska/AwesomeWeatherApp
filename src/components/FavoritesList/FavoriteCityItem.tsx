import { FavoritesIcon } from 'components/common/FavoritesIcon';
import React from 'react';
import { StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { City } from 'types/openWeather';

interface FavoriteCityItemProps {
  city: City;
  onRemove: (cityId: number) => void;
  onPress: (city: City) => void;
}

const FavoriteCityItem = ({
  city,
  onRemove,
  onPress,
}: FavoriteCityItemProps) => {
  const { colors } = useTheme();

  const renderFavoritestIcon = () => (
    <FavoritesIcon isFavorite={true} onPress={() => onRemove(city.id)} />
  );

  const renderLeftIcon = () => (
    <List.Icon icon="map-marker" color={colors.onSurfaceVariant} />
  );

  return (
    <List.Item
      title={`${city.name}, ${city.sys.country}`}
      description={`Lat: ${city.coord.lat}, Lon: ${city.coord.lon}`}
      left={renderLeftIcon}
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
    paddingLeft: 8,
  },
});

export default FavoriteCityItem;
