import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCitiesQuery } from 'api/queries';
import Screen from 'components/common/Screen';
import { FavoritesList } from 'components/FavoritesList';
import { Search } from 'components/Search';
import { useFavoritesContext } from 'context/FavoritesContext';
import useGetWeatherForMany, { Status } from 'hooks/useGetWeatherForMany';
import { MIN_QUERY_LENGTH } from 'hooks/useSearchCities';
import debounce from 'lodash.debounce';
import { RootStackParamList } from 'navigation/AppNavigator';
import React, { useCallback, useMemo, useState } from 'react';
import { City } from 'types/openWeather';

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
    data: dataForFavorites,
    error: errorFavorites,
    status: statusFavorites,
  } = useGetWeatherForMany(cityIds);

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
    <Screen>
      <Search
        inputValue={inputValue}
        data={data?.list || []}
        isLoading={isLoading}
        error={error}
        showResults={query.length >= MIN_QUERY_LENGTH}
        onInputChange={handleInputChange}
        onCitySelect={handleCitySelect}
        onInputClear={handleInputClear}
        testID="search-view"
      />
      <FavoritesList
        favorites={dataForFavorites?.list}
        onRemove={removeFromFavorites}
        onCitySelect={handleCitySelect}
        testID="favorites-list"
        isLoading={statusFavorites === Status.FETCHING}
        error={errorFavorites === Status.ERROR ? errorFavorites : null}
      />
    </Screen>
  );
};

export default HomeScreen;
