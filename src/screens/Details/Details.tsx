import { useCallback, useEffect, useMemo, useState } from 'react';
import { InteractionManager, StyleSheet, View } from 'react-native';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootStackParamList } from 'navigation/AppNavigator';

import { useWeatherForCityQuery } from 'api/queries';
import { ErrorBanner } from 'components/ErrorBanner';
import { FavoritesButton } from 'components/FavoritesButton';
import Screen from 'components/Screen';
import { useFavoritesContext } from 'context/FavoritesContext';

import WeatherContent from './components/WeatherContent';

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'Details'>>();
  const { city } = route.params;
  const [transititionFinished, setTransitionFinished] = useState(false);
  const {
    favorites,
    error: favoritesError,
    addToFavorites,
    removeFromFavorites,
    clearError,
  } = useFavoritesContext();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setTransitionFinished(true);
    });

    return () => task.cancel();
  }, []);

  const { data, isLoading, error } = useWeatherForCityQuery({
    lat: city.coord.lat,
    lon: city.coord.lon,
    enabled: transititionFinished,
  });

  const isFavoriteCity = useMemo(
    () => favorites.some(favorite => favorite.id === city.id),
    [city, favorites],
  );

  const handleToggleFavorite = useCallback(() => {
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
  }, [city, isFavoriteCity, addToFavorites, removeFromFavorites]);

  const renderHeaderRight = useCallback(
    () => (
      <FavoritesButton
        isFavorite={isFavoriteCity}
        onPress={handleToggleFavorite}
      />
    ),
    [isFavoriteCity, handleToggleFavorite],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <Screen>
      <View style={styles.container}>
        <ErrorBanner
          visible={Boolean(favoritesError)}
          error={favoritesError}
          onClosePress={clearError}
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
