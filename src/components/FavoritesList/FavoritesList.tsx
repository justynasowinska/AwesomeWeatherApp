import React from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { City } from 'types/openWeather';
import FavoriteCityItem from './FavoriteCityItem';

interface FavoritesListProps extends Omit<FlatListProps<City>, 'renderItem' | 'data'> {
  favorites: City[];
  onRemove: (cityId: number) => void;
  onCitySelect: (city: City) => void;
}

const FavoritesList = ({
  favorites,
  onRemove,
  onCitySelect,
  ...props
}: FavoritesListProps) => {
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
        <FavoriteCityItem
          city={item}
          onRemove={onRemove}
          onPress={onCitySelect}
        />
      )}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={renderListEmptyComponent}
      ListHeaderComponent={renderListHeaderComponent}
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
});

export default FavoritesList;
