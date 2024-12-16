import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

import { WeatherIcon } from 'components/WeatherIcon';
import { kelvinToCelsius } from 'utils/openWeatherHelpers';

interface FavoriteCityItemRightProps {
  icon: string;
  temperature: number;
}

const FavoriteCityItemRight = ({
  icon,
  temperature,
}: FavoriteCityItemRightProps) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.temperature}>
        {kelvinToCelsius(temperature)}°C
      </Text>
      <WeatherIcon
        icon={icon}
        size={70}
        style={styles.weatherIcon}
        testID="avatar-image"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    backgroundColor: 'transparent',
  },
  temperature: {
    textAlign: 'center',
  },
});

export default FavoriteCityItemRight;
