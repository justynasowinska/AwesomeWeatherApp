import { useEffect } from 'react';
import { Text } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import {
  FavoritesProvider,
  useFavoritesContext,
} from 'context/FavoritesContext';
import useFavorites from 'hooks/useFavorites';

import { City } from 'types/openWeather';

jest.mock('hooks/useFavorites');

describe('FavoritesProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides data and functions from useFavorites', () => {
    const initialFavorites: City[] = [
      {
        id: 1,
        name: 'City Initial',
        sys: { country: 'PL' },
        coord: { lon: 1, lat: 2 },
      },
    ];
    const mockCity: City = {
      id: 2,
      name: 'City',
      sys: { country: 'PL' },
      coord: { lon: 1, lat: 2 },
    };
    const mockAddToFavorites = jest.fn();
    const mockRemoveFromFavorites = jest.fn();
    const mockClearAllFavorites = jest.fn();
    const mockClearError = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: initialFavorites,
      error: null,
      addToFavorites: mockAddToFavorites,
      removeFromFavorites: mockRemoveFromFavorites,
      clearAllFavorites: mockClearAllFavorites,
      clearError: mockClearError,
    });

    const ComponentUsingContext = () => {
      const {
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearAllFavorites,
        clearError,
      } = useFavoritesContext();

      useEffect(() => {
        addToFavorites(mockCity);
        removeFromFavorites(1);
        clearAllFavorites();
        clearError();
      }, [addToFavorites, removeFromFavorites, clearAllFavorites, clearError]);

      return <Text testID="favorites">{favorites[0].name}</Text>;
    };

    render(
      <FavoritesProvider>
        <ComponentUsingContext />
      </FavoritesProvider>,
    );

    expect(screen.getByTestId('favorites')).toHaveTextContent('City Initial');
    expect(mockAddToFavorites).toHaveBeenCalledWith(mockCity);
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(1);
    expect(mockClearAllFavorites).toHaveBeenCalled();
    expect(mockClearError).toHaveBeenCalled();
  });

  it('throws an error when useFavoritesContext is used outside of FavoritesProvider', () => {
    // Silent console.error for this test
    const err = console.error;
    console.error = jest.fn();

    const ComponentUsingContext = () => {
      useFavoritesContext();
      return null;
    };

    expect(() => render(<ComponentUsingContext />)).toThrow(
      'useFavoritesContext must be used within a FavoritesProvider',
    );

    console.error = err;
  });
});
