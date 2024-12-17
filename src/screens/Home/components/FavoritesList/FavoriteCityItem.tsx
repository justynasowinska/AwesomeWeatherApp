import { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { List, useTheme } from 'react-native-paper';

import { FavoritesIcon } from 'components/FavoritesIcon';
import { createWeatherDescription } from 'utils/openWeatherHelpers';

import { City, WeatherCity } from 'types/openWeather';

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
  const icon = city.weather[0].icon;
  const weatherDescription = useMemo(
    () => createWeatherDescription(city.weather),
    [city.weather],
  );

  const renderRightContent = useCallback(
    () => <FavoriteCityItemRight icon={icon} temperature={city.main.temp} />,
    [icon, city.main.temp],
  );

  const handleRemove = useCallback(() => {
    onRemove(city.id);
  }, [city.id, onRemove]);

  const renderLeftContent = useCallback(
    () => (
      <FavoritesIcon
        isFavorite
        onPress={handleRemove}
        style={styles.favoriteIcon}
      />
    ),
    [handleRemove],
  );

  const handlePress = useCallback(() => {
    onPress(city);
  }, [city, onPress]);

  return (
    <List.Item
      title={`${city.name}, ${city.sys.country}`}
      description={weatherDescription}
      descriptionStyle={[styles.description, { color: colors.onSurface }]}
      left={renderLeftContent}
      right={renderRightContent}
      style={[styles.item, { backgroundColor: colors.surface }]}
      onPress={handlePress}
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

export default memo(FavoriteCityItem);
