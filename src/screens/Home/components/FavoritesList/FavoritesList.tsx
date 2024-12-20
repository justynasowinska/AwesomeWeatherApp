import { FlatList, FlatListProps, StyleSheet } from 'react-native';

import { City, WeatherCity } from 'types/openWeather';

import FavoriteCityItem from './FavoriteCityItem';
import FavoriteListEmpty from './FavoriteListEmpty';
import FavoriteListError from './FavoriteListError';
import FavoriteListLoading from './FavoriteListLoading';

interface FavoritesListProps
  extends Omit<FlatListProps<WeatherCity>, 'renderItem' | 'data'> {
  favorites?: WeatherCity[] | null;
  isLoading: boolean;
  error: Error | null;
  onRemove: (cityId: number) => void;
  onCitySelect: (city: City, fromFavorites: boolean) => void;
}

const FavoritesList = ({
  favorites,
  isLoading,
  error,
  onRemove,
  onCitySelect,
  ...props
}: FavoritesListProps) => {
  const handleCitySelect = (city: City) => {
    onCitySelect(city, true);
  };

  if (isLoading && !favorites) {
    return <FavoriteListLoading />;
  }

  if (error) {
    return <FavoriteListError error={error} />;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <FavoriteCityItem
          city={item}
          onRemove={onRemove}
          onPress={handleCitySelect}
        />
      )}
      ListEmptyComponent={<FavoriteListEmpty />}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.list}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 16,
  },
});

export default FavoritesList;
