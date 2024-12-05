import { NavigationProp } from '@react-navigation/native';
import FavoritesList from 'components/FavoritesList';
import Search from 'components/Search';
import useFavorites from 'hooks/useFavorites';
import { RootStackParamList } from 'navigation/AppNavigator';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WeatherCity } from 'types/openWeather';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleCitySelect = (city: WeatherCity) => {
    navigation.navigate('Details', { city });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Search onCitySelect={handleCitySelect} />
      <FavoritesList favorites={favorites} onRemove={removeFromFavorites} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default HomeScreen;
