import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/AppNavigator';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import {
  createWeatherDescription,
  getWeatherIconUrl,
  kelvinToCelsius,
} from 'utils/openWeatherHelpers';

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { city } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{city.name}</Text>
      <View style={styles.iconContainer}>
        <Avatar.Image
          source={{
            uri: getWeatherIconUrl(city?.weather[0]?.icon),
          }}
          size={100}
        />
      </View>
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
  cityName: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 28,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default DetailsScreen;
