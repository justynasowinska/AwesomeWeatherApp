import { NavigationProp } from '@react-navigation/native';
import { FavoritesList } from 'components/FavoritesList';
import { Search } from 'components/Search';
import { useFavoritesContext } from 'context/FavoritesContext';
import useSearchCities, { MIN_QUERY_LENGTH } from 'hooks/useSearchCities';
import debounce from 'lodash.debounce';
import { RootStackParamList } from 'navigation/AppNavigator';
import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { City } from 'types/openWeather';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const { data, status, error } = useSearchCities(query);

  const debouncedSetQuery = useMemo(
    () => debounce((text: string) => setQuery(text), 300),
    [],
  );

  const handleInputChange = useCallback(
    (text: string) => {
      setInputValue(text);
      debouncedSetQuery(text);
    },
    [debouncedSetQuery],
  );

  const handleInputClear = () => {
    setInputValue('');
    setQuery('');
  };

  const handleCitySelect = (city: City) => {
    handleInputClear();
    navigation.navigate('Details', { city });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Search
        inputValue={inputValue}
        data={data}
        status={status}
        error={error}
        showResults={query.length >= MIN_QUERY_LENGTH}
        onInputChange={handleInputChange}
        onCitySelect={handleCitySelect}
        onInputClear={handleInputClear}
      />
      <FavoritesList
        favorites={favorites}
        onRemove={removeFromFavorites}
        onCitySelect={handleCitySelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default HomeScreen;
