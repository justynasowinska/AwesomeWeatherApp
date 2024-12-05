import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { City } from 'types/openWeather';
import FavoriteCityItem from './FavoriteCityItem';

interface FavoritesListProps {
  favorites: City[];
  onRemove: (cityId: number) => void;
}

const FavoritesList = ({ favorites, onRemove }: FavoritesListProps) => {
  const renderListHeaderComponent = () => (
    <Text variant="titleMedium" style={styles.title}>
      Your Favorites Places:
    </Text>
  );
  const renderListEmptyComponent = () => (
    <View style={styles.emptyMessage}>
      <Text>No favorite cities yet.</Text>
    </View>
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <FavoriteCityItem city={item} onRemove={onRemove} />
      )}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={renderListEmptyComponent}
      ListHeaderComponent={renderListHeaderComponent}
      style={styles.list}
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
});

export default FavoritesList;
