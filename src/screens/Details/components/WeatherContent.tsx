import { StyleSheet } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

import { OpenWeatherCityWeatherResponse } from 'types/openWeather';

import ErrorMessage from './ErrorMessage';
import WeatherDetails from './WeatherDetails';

interface WeatherContentProps {
  isLoading: boolean;
  error: Error | null;
  data?: OpenWeatherCityWeatherResponse | null;
}

const WeatherContent = ({ isLoading, error, data }: WeatherContentProps) => {
  if (isLoading) {
    return (
      <ActivityIndicator
        size="small"
        style={styles.loader}
        accessibilityLabel="Loading weather data"
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage error={error?.message || 'Failed to load weather data.'} />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <WeatherDetails
      icon={data?.weather[0]?.icon}
      temperature={data?.main.temp}
      weathers={data?.weather}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    margin: 26,
  },
});

export default WeatherContent;
