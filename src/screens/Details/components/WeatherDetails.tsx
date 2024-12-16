import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

import { WeatherIcon } from 'components/WeatherIcon';
import {
  createWeatherDescription,
  kelvinToCelsius,
} from 'utils/openWeatherHelpers';

import { Weather } from 'types/openWeather';

interface WeatherDetailsProps {
  icon: string;
  temperature: number;
  weathers: Weather[];
}

const WeatherDetails = ({
  icon,
  temperature,
  weathers,
}: WeatherDetailsProps) => {
  const weatherDescription = useMemo(
    () => createWeatherDescription(weathers),
    [weathers],
  );

  const temperatureCelsius = useMemo(
    () => kelvinToCelsius(temperature),
    [temperature],
  );

  return (
    <View style={styles.container}>
      <WeatherIcon
        icon={icon}
        size={100}
        style={styles.weatherIcon}
        testID="avatar-image"
      />
      <Text style={styles.temperature}>{temperatureCelsius}°C</Text>
      <Text style={styles.description}>{weatherDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
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

export default WeatherDetails;
