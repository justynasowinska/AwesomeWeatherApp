import { useEffect, useState } from 'react';
import { WeatherCity } from 'types/openWeather';
import useAsyncStorage from './useAsyncStorage';

const FAVORITES_KEY = 'favorites';

const useFavorites = () => {
  const {
    value: favorites,
    save,
    load,
    clearAll,
  } = useAsyncStorage<WeatherCity[]>(FAVORITES_KEY);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeFavorites = async () => {
      try {
        await load();
      } catch (e) {
        console.error('Failed to load favorites:', e);
        setError('Failed to load favorites');
      }
    };

    initializeFavorites();
  }, [load]);

  const addToFavorites = async (city: WeatherCity) => {
    try {
      const updatedFavorites = favorites ? [...favorites, city] : [city];
      await save(updatedFavorites);
    } catch (e) {
      console.error('Failed to add favorite:', e);
      setError('Failed to add favorite');
    }
  };

  const removeFromFavorites = async (cityId: number) => {
    try {
      const updatedFavorites =
        favorites?.filter(city => city.id !== cityId) || [];
      await save(updatedFavorites);
    } catch (e) {
      console.error('Failed to remove favorite:', e);
      setError('Failed to remove favorite');
    }
  };

  const clearAllFavorites = async () => {
    try {
      await clearAll();
    } catch (e) {
      console.error('Failed to clear favorites:', e);
      setError('Failed to clear favorites');
    }
  };

  const clearError = () => setError(null);

  return {
    favorites: favorites || [],
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
    error,
    clearError,
  };
};

export default useFavorites;
