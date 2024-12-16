import React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { useCitiesQuery, useGetWeatherForManyQuery } from 'api/queries';
import { useFavoritesContext } from 'context/FavoritesContext';
import HomeScreen from 'screens/Home/Home';

jest.mock('context/FavoritesContext');
jest.mock('api/queries');

const mockUseFavoritesContext = useFavoritesContext as jest.Mock;
const mockUseCitiesQuery = useCitiesQuery as jest.Mock;
const mockUseGetWeatherForManyQuery = useGetWeatherForManyQuery as jest.Mock;

describe('HomeScreen', () => {
  const mockFavoriteCity = {
    id: 1,
    name: 'Test City',
    sys: { country: 'US' },
    coord: { lon: -74, lat: 40 },
  };

  const mockSearchCity = {
    id: 2,
    name: 'Test City 2',
    sys: { country: 'US' },
    coord: { lon: -74, lat: 40 },
  };

  const weatherData = {
    list: [
      {
        ...mockFavoriteCity,
        main: { temp: 273.15 },
        weather: [{ icon: '01d' }],
      },
    ],
  };

  beforeEach(() => {
    mockUseGetWeatherForManyQuery.mockReturnValue({
      data: weatherData,
      isLoading: false,
      error: null,
    });
    mockUseCitiesQuery.mockReturnValue({
      data: { list: [mockSearchCity] },
      isLoading: false,
      error: null,
    });
    mockUseFavoritesContext.mockReturnValue({
      favorites: [mockFavoriteCity],
      removeFromFavorites: jest.fn(),
      addToFavorites: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates query on input change and shows results when length >= MIN_QUERY_LENGTH', async () => {
    mockUseFavoritesContext.mockReturnValue({
      favorites: [],
      removeFromFavorites: jest.fn(),
      addToFavorites: jest.fn(),
      clearAllFavorites: jest.fn(),
      clearError: jest.fn(),
      error: null,
    });

    mockUseCitiesQuery.mockReturnValue({
      data: { list: [mockSearchCity] },
      isLoading: false,
      error: null,
    });

    mockUseGetWeatherForManyQuery.mockReturnValue({
      data: weatherData,
      isLoading: false,
      error: null,
    });

    render(<HomeScreen />);
    const input = screen.getByPlaceholderText('Search for a city');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'Test City 2');
      jest.runAllTimers();
    });

    expect(await screen.findByText('Test City 2, US')).toBeOnTheScreen();
  });

  it('displays weather data for favorite cities', () => {
    mockUseGetWeatherForManyQuery.mockReturnValueOnce({
      data: weatherData,
      isLoading: false,
      error: null,
    });

    render(<HomeScreen />);
    const tempText = screen.getByText('0°C');
    expect(tempText).toBeOnTheScreen();
  });

  it('handles search input clear', async () => {
    render(<HomeScreen />);
    const input = screen.getByPlaceholderText('Search for a city');
    fireEvent.changeText(input, 'Test');

    expect(input.props.value).toBe('Test');

    const clearButton = screen.getByTestId('icon-right-close');

    fireEvent.press(clearButton);

    expect(input.props.value).toBe('');
  });
});
