import React from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Divider, Text, useTheme } from 'react-native-paper';
import { City, WeatherCity } from 'types/openWeather';
import FavoriteCityItem from './FavoriteCityItem';

interface FavoritesListProps
  extends Omit<FlatListProps<WeatherCity>, 'renderItem' | 'data'> {
  favorites?: WeatherCity[] | null;
  isLoading: boolean;
  error: Error | null;
  onRemove: (cityId: number) => void;
  onCitySelect: (city: City) => void;
}

const FavoritesList = ({
  favorites,
  isLoading,
  error,
  onRemove,
  onCitySelect,
  ...props
}: FavoritesListProps) => {
  const { colors } = useTheme();

  const renderListEmptyComponent = () => (
    <View style={styles.emptyMessage}>
      <Text variant="titleLarge">No favorite cities yet.</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.emptyMessage}>
        <Text style={styles.loadingMessage} variant="titleLarge">
          Loading Your Favorites...
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyMessage}>
        <Text style={{ color: colors.error }} variant="titleLarge">
          {error.message || 'Failed to load your favorites.'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <FavoriteCityItem
          city={item}
          onRemove={onRemove}
          onPress={onCitySelect}
        />
      )}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={renderListEmptyComponent}
      keyboardShouldPersistTaps="handled"
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
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    padding: 16,
    alignItems: 'center',
  },
  loadingMessage: {
    marginBottom: 16,
  },
});

export default FavoritesList;
