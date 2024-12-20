import { useCallback, useMemo, useState } from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';

import { RootStackParamList } from 'navigation/AppNavigator';

import {
  MIN_QUERY_LENGTH,
  useCitiesQuery,
  useGetWeatherForManyQuery,
} from 'api/queries';
import Screen from 'components/Screen';
import { useFavoritesContext } from 'context/FavoritesContext';

import { City } from 'types/openWeather';

import { FavoritesList } from './components/FavoritesList';
import { Search } from './components/Search';

const HomeScreen = () => {
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useCitiesQuery(query);

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'Home'>>();

  const cityIds = useMemo(() => {
    return favorites.map(city => city.id);
  }, [favorites]);

  const {
    data: dataFavoritesWeather,
    error: errorFavoritesWeathers,
    isLoading: loadingFavoritesWeathers,
  } = useGetWeatherForManyQuery(cityIds);

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

  const handleInputClear = useCallback(() => {
    setInputValue('');
    setQuery('');
  }, []);

  const handleCitySelect = (city: City, fromFavorites?: boolean) => {
    handleInputClear();
    navigation.navigate('Details', { city, fromFavorites });
  };

  return (
    <Screen>
      <Search
        inputValue={inputValue}
        data={data?.list || []}
        isLoading={isLoading}
        error={error}
        showResults={query.length >= MIN_QUERY_LENGTH && !isLoading}
        onInputChange={handleInputChange}
        onCitySelect={handleCitySelect}
        onInputClear={handleInputClear}
        testID="search-view"
      />
      <FavoritesList
        favorites={dataFavoritesWeather?.list}
        onRemove={removeFromFavorites}
        onCitySelect={handleCitySelect}
        testID="favorites-list"
        isLoading={loadingFavoritesWeathers}
        error={errorFavoritesWeathers}
      />
    </Screen>
  );
};

export default HomeScreen;
