import { createContext, useContext, useMemo } from 'react';

import useFavorites from 'hooks/useFavorites';

import { City } from 'types/openWeather';

interface FavoritesContextValue {
  favorites: City[];
  error: string | null;
  addToFavorites: (city: City) => void;
  removeFromFavorites: (cityId: number) => void;
  clearAllFavorites: () => void;
  clearError: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue>(
  null as unknown as FavoritesContextValue,
);

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

  const contextValue = useMemo(
    () => ({
      favorites,
      error,
      addToFavorites,
      removeFromFavorites,
      clearAllFavorites,
      clearError,
    }),
    [
      favorites,
      error,
      addToFavorites,
      removeFromFavorites,
      clearAllFavorites,
      clearError,
    ],
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
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
