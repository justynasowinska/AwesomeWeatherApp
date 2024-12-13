import { useEffect, useState } from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { City } from 'types/openWeather';

const FAVORITES_KEY = 'favorites';

const useFavorites = () => {
  const { getItem, setItem, removeItem } = useAsyncStorage(FAVORITES_KEY);
  const [favorites, setFavorites] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeFavorites = async () => {
      try {
        const storedFavorites = await getItem();
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (e) {
        setError('Failed to load favorites');
      }
    };

    initializeFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToFavorites = async (city: City) => {
    try {
      const updatedFavorites = [...favorites, city];
      await setItem(JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (e) {
      setError('Failed to add favorite');
    }
  };

  const removeFromFavorites = async (cityId: number) => {
    try {
      const updatedFavorites = favorites.filter(city => city.id !== cityId);
      await setItem(JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (e) {
      setError('Failed to remove favorite');
    }
  };

  const clearAllFavorites = async () => {
    try {
      await removeItem();
      setFavorites([]);
    } catch (e) {
      setError('Failed to clear favorites');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    favorites: favorites,
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
    error,
    clearError,
  };
};

export default useFavorites;
