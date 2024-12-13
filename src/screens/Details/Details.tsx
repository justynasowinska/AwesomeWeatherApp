import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from 'navigation/AppNavigator';

import { useWeatherForCityQuery } from 'api/queries';
import Screen from 'components/common/Screen';
import { ErrorBanner } from 'components/ErrorBanner';
import { useFavoritesContext } from 'context/FavoritesContext';

import Header from './components/Header';
import WeatherContent from './components/WeatherContent';

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { city } = route.params;
  const {
    favorites,
    error: favoritesError,
    addToFavorites,
    removeFromFavorites,
    clearError,
  } = useFavoritesContext();

  const isFavoriteCity = useMemo(
    () => favorites.some(favorite => favorite.id === city.id),
    [city, favorites],
  );

  const { data, isLoading, error } = useWeatherForCityQuery({
    lat: city.coord.lat,
    lon: city.coord.lon,
  });

  const handleToggleFavorite = () => {
    if (isFavoriteCity) {
      removeFromFavorites(city.id);
    } else {
      addToFavorites({
        id: city.id,
        name: city.name,
        coord: city.coord,
        sys: city.sys,
      });
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ErrorBanner
          visible={Boolean(favoritesError)}
          error={favoritesError}
          onClosePress={clearError}
        />
        <Header
          cityName={city.name}
          isFavorite={isFavoriteCity}
          handleToggleFavorite={handleToggleFavorite}
        />
        <WeatherContent isLoading={isLoading} error={error} data={data} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default DetailsScreen;
