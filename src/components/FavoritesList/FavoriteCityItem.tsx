import { FavoritesIcon } from 'components/common/FavoritesIcon';
import React from 'react';
import { StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { City, WeatherCity } from 'types/openWeather';
import { createWeatherDescription } from 'utils/openWeatherHelpers';
import FavoriteCityItemRight from './FavoriteCityItemRight';

interface FavoriteCityItemProps {
  city: WeatherCity;
  onRemove: (cityId: number) => void;
  onPress: (city: City) => void;
}

const FavoriteCityItem = ({
  city,
  onRemove,
  onPress,
}: FavoriteCityItemProps) => {
  const { colors } = useTheme();
  const renderRightContent = () => (
    <FavoriteCityItemRight
      icon={city.weather[0].icon}
      temperature={city.main.temp}
    />
  );

  const renderLeftContent = () => (
    <FavoritesIcon
      isFavorite
      onPress={() => onRemove(city.id)}
      style={styles.favoriteIcon}
    />
  );

  return (
    <List.Item
      title={`${city.name}, ${city.sys.country}`}
      description={createWeatherDescription(city.weather)}
      descriptionStyle={[styles.description, { color: colors.onSurface }]}
      left={renderLeftContent}
      right={renderRightContent}
      style={[styles.item, { backgroundColor: colors.surface }]}
      onPress={() => onPress(city)}
      contentStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingRight: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  content: {
    paddingLeft: 3,
  },
  description: {
    marginTop: 6,
  },
  favoriteIcon: {
    alignSelf: 'center',
  },
});

export default FavoriteCityItem;
