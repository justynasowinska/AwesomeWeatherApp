import { RouteProp, useRoute } from '@react-navigation/native';
import { useFavoritesContext } from 'context/FavoritesContext';
import useGetWeatherForCity, { Status } from 'hooks/useGetWeatherForCity';
import { RootStackParamList } from 'navigation/AppNavigator';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  Text,
} from 'react-native-paper';
import {
  createWeatherDescription,
  getWeatherIconUrl,
  kelvinToCelsius,
} from 'utils/openWeatherHelpers';

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { city } = route.params;
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();

  const isFavoriteCity = useMemo(
    () => favorites.some(favorite => favorite.id === city.id),
    [city, favorites],
  );

  const { data, status } = useGetWeatherForCity(city.coord.lat, city.coord.lon);

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
    if (status === Status.FETCHING) {
      return <ActivityIndicator size="large" />;
    }

    if (status === Status.ERROR || !data) {
      return <Text style={styles.error}>Failed to load weather data.</Text>;
    }

    return (
      <>
        <Avatar.Image
          source={{
            uri: getWeatherIconUrl(data.weather[0]?.icon),
          }}
          size={100}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>
          {kelvinToCelsius(data.main.temp)}°C
        </Text>
        <Text style={styles.description}>
          {createWeatherDescription(data.weather)}
        </Text>
      </>
    );
  }, [data, status]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{city.name}</Text>
        <IconButton
          icon={isFavoriteCity ? 'heart' : 'heart-outline'}
          onPress={handleToggleFavorite}
          size={34}
          accessibilityLabel="Add to favorites"
          style={styles.favoriteButton}
        />
      </View>
      {renderContent()}
    </View>
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
    color: 'red',
    textAlign: 'center',
  },
});

export default DetailsScreen;
