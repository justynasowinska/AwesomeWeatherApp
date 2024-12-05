import useFavorites from 'hooks/useFavorites';
import React, { createContext, useContext } from 'react';
import { City } from 'types/openWeather';

interface FavoritesContextValue {
  favorites: City[];
  error: string | null;
  addToFavorites: (city: City) => void;
  removeFromFavorites: (cityId: number) => void;
  clearAllFavorites: () => void;
  clearError: () => void;
}

const defaultContextValue: FavoritesContextValue = {
  favorites: [],
  error: null,
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  clearAllFavorites: () => {},
  clearError: () => {},
};

const FavoritesContext =
  createContext<FavoritesContextValue>(defaultContextValue);

export const FavoritesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {
    favorites,
    error,
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
    clearError,
  } = useFavorites();

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        error,
        addToFavorites,
        removeFromFavorites,
        clearAllFavorites,
        clearError,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider',
    );
  }
  return context;
};
