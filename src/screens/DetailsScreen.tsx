import { RouteProp, useRoute } from '@react-navigation/native';
import { useWeatherForCityQuery } from 'api/queries';
import { FavoritesIcon } from 'components/common/FavoritesIcon';
import Screen from 'components/common/Screen';
import { ErrorBanner } from 'components/ErrorBanner';
import { useFavoritesContext } from 'context/FavoritesContext';
import { RootStackParamList } from 'navigation/AppNavigator';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Text, useTheme } from 'react-native-paper';
import {
  createWeatherDescription,
  getWeatherIconUrl,
  kelvinToCelsius,
} from 'utils/openWeatherHelpers';

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
  const { colors } = useTheme();

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

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          accessibilityLabel="Loading weather data"
        />
      );
    }

    if (error) {
      const errorMessage = error.message || 'Failed to load weather data.';
      return (
        <Text style={[styles.error, { color: colors.error }]}>
          {errorMessage}
        </Text>
      );
    }

    if (!data) {
      return null;
    }

    return (
      <>
        <Avatar.Image
          source={{
            uri: getWeatherIconUrl(data?.weather[0]?.icon),
          }}
          size={100}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>
          {kelvinToCelsius(data?.main.temp)}°C
        </Text>
        <Text style={styles.description}>
          {createWeatherDescription(data?.weather)}
        </Text>
      </>
    );
  }, [colors.error, data, error, isLoading]);

  return (
    <Screen>
      <View style={styles.container}>
        <ErrorBanner
          visible={Boolean(favoritesError)}
          error={favoritesError}
          onClosePress={clearError}
        />
        <View style={styles.header}>
          <Text style={styles.cityName}>{city.name}</Text>
          <FavoritesIcon
            isFavorite={isFavoriteCity}
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
            size={34}
            accessibilityLabel={
              isFavoriteCity
                ? `Remove ${city.name} from favorites`
                : `Add ${city.name} to favorites`
            }
          />
        </View>
        {renderContent()}
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
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cityName: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    right: -56,
  },
  weatherIcon: {
    marginBottom: 16,
  },
  temperature: {
    fontSize: 28,
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsScreen;
