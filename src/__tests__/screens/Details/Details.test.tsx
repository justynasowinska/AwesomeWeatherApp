import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';

import { useWeatherForCityQuery } from 'api/queries';
import { useFavoritesContext } from 'context/FavoritesContext';
import DetailsScreen from 'screens/Details/Details';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
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
const useNavigationMock = useNavigation as jest.Mock;

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
    useNavigationMock.mockReturnValue({
      setOptions: jest.fn(),
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with city details', () => {
    mockUseWeatherForCityQuery.mockReturnValue({
      data: {
        id: 1,
        name: 'Test City',
        coord: { lat: 0, lon: 0 },
        main: {
          temp: 273.15,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          humidity: 0,
        },
        weather: [
          { id: 1, main: 'Clear', icon: '01d', description: 'Clear sky' },
        ],
        sys: { country: 'TC' },
        dt: 0,
        wind: { speed: 0, deg: 0 },
        clouds: { all: 0 },
        base: '',
        visibility: 0,
        timezone: 0,
        cod: 0,
      },
      isLoading: false,
      error: null,
    });
    render(<DetailsScreen />);
    expect(screen.getByText('Clear sky')).toBeOnTheScreen();
  });

  it('sets headerRight to FavoritesButton', () => {
    render(<DetailsScreen />);
    expect(useNavigationMock().setOptions).toHaveBeenCalledWith({
      headerRight: expect.any(Function),
    });
  });
});
