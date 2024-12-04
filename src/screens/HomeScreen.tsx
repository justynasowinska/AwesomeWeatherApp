import Search from 'components/Search';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WeatherCity } from 'types/openWeather';

const HomeScreen = () => {
  const handleCitySelect = (city: WeatherCity) => {
    console.log('Selected City:', city);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Search onCitySelect={handleCitySelect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default HomeScreen;
