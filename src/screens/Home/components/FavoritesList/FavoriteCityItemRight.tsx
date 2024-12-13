import { StyleSheet, View } from 'react-native';

import { Avatar, Text } from 'react-native-paper';

import { getWeatherIconUrl, kelvinToCelsius } from 'utils/openWeatherHelpers';

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
      <Avatar.Image
        source={{
          uri: getWeatherIconUrl(icon),
        }}
        size={70}
        style={styles.weatherIcon}
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
