import React from 'react';

import { useRoute } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { useWeatherForCityQuery } from 'api/queries';
import { useFavoritesContext } from 'context/FavoritesContext';
import DetailsScreen from 'screens/Details/Details';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('context/FavoritesContext', () => ({
  useFavoritesContext: jest.fn(),
}));

jest.mock('api/queries', () => ({
  useWeatherForCityQuery: jest.fn(),
}));

const mockUseWeatherForCityQuery = useWeatherForCityQuery as jest.Mock;
const mockUseFavoritesContext = useFavoritesContext as jest.Mock;
const useRouteMock = useRoute as jest.Mock;

describe('DetailsScreen', () => {
  const mockCity = {
    id: 1,
    name: 'Test City',
    coord: { lat: 0, lon: 0 },
    sys: { country: 'TC' },
  };

  const mockFavoritesContext: {
    favorites: (typeof mockCity)[];
    error: null | string;
    addToFavorites: jest.Mock;
    removeFromFavorites: jest.Mock;
    clearError: jest.Mock;
  } = {
    favorites: [],
    error: null,
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    clearError: jest.fn(),
  };

  const mockWeatherQuery = {
    data: null,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    useRouteMock.mockReturnValue({ params: { city: mockCity } });
    mockUseFavoritesContext.mockReturnValue(mockFavoritesContext);
    mockUseWeatherForCityQuery.mockReturnValue(mockWeatherQuery);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls addToFavorites when handleToggleFavorite is called and city is not a favorite', () => {
    render(<DetailsScreen />);

    fireEvent.press(screen.getByTestId('header-favorite-toggle'));
    expect(mockFavoritesContext.addToFavorites).toHaveBeenCalledWith({
      id: mockCity.id,
      name: mockCity.name,
      coord: mockCity.coord,
      sys: mockCity.sys,
    });
  });

  it('calls removeFromFavorites when handleToggleFavorite is called and city is a favorite', () => {
    mockFavoritesContext.favorites = [mockCity];
    render(<DetailsScreen />);

    fireEvent.press(screen.getByTestId('header-favorite-toggle'));
    expect(mockFavoritesContext.removeFromFavorites).toHaveBeenCalledWith(
      mockCity.id,
    );
  });
});
