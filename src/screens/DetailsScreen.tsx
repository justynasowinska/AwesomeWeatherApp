import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/AppNavigator';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import {
  createWeatherDescription,
  getWeatherIconUrl,
  kelvinToCelsius,
} from 'utils/openWeatherHelpers';

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { city } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{city.name}</Text>
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          onPress={handleToggleFavorite}
          size={34}
          accessibilityLabel="Add to favorites"
          style={styles.favoriteButton}
        />
      </View>
      <Avatar.Image
        source={{
          uri: getWeatherIconUrl(city?.weather[0]?.icon),
        }}
        size={100}
        style={styles.weatherIcon}
      />
      <Text style={styles.temperature}>
        {kelvinToCelsius(city.main.temp)}°C
      </Text>
      <Text style={styles.description}>
        {createWeatherDescription(city.weather)}
      </Text>
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
});

export default DetailsScreen;
