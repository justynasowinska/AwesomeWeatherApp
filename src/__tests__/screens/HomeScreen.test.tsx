import { NavigationProp } from '@react-navigation/native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { useFavoritesContext } from 'context/FavoritesContext';
import useGetWeatherForMany from 'hooks/useGetWeatherForMany';
import useSearchCities from 'hooks/useSearchCities';
import { RootStackParamList } from 'navigation/AppNavigator';
import React from 'react';
import HomeScreen from 'screens/HomeScreen';

jest.mock('context/FavoritesContext');
const mockedUseFavoritesContext = useFavoritesContext as jest.Mock;

jest.mock('hooks/useSearchCities');
const mockedUseSearchCities = useSearchCities as jest.Mock;

jest.mock('hooks/useGetWeatherForMany');
const mockedUseGetWeatherForMany = useGetWeatherForMany as jest.Mock;

const mockNavigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<RootStackParamList, 'Home'>;

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
    mockedUseGetWeatherForMany.mockReturnValue({
      data: null,
      status: 'idle',
      error: null,
    });
    mockedUseSearchCities.mockReturnValue({
      data: [],
      status: 'idle',
      error: null,
    });
    mockedUseFavoritesContext.mockReturnValue({
      favorites: [],
      removeFromFavorites: jest.fn(),
      addToFavorites: jest.fn(),
      clearAllFavorites: jest.fn(),
      clearError: jest.fn(),
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search and favorites list components', () => {
    mockedUseFavoritesContext.mockReturnValueOnce({
      favorites: [mockFavoriteCity],
      removeFromFavorites: jest.fn(),
      addToFavorites: jest.fn(),
      clearAllFavorites: jest.fn(),
      clearError: jest.fn(),
      error: null,
    });

    mockedUseSearchCities.mockReturnValueOnce({
      data: [],
      status: 'success',
      error: null,
    });

    mockedUseGetWeatherForMany.mockReturnValueOnce({
      data: weatherData,
      status: 'success',
      error: null,
    });

    render(<HomeScreen navigation={mockNavigation} />);
    expect(screen.getByTestId('search-view')).toBeOnTheScreen();
    expect(screen.getByTestId('favorites-list')).toBeOnTheScreen();
  });

  it('updates query on input change and shows results when length >= MIN_QUERY_LENGTH', async () => {
    mockedUseFavoritesContext.mockReturnValue({
      favorites: [],
      removeFromFavorites: jest.fn(),
      addToFavorites: jest.fn(),
      clearAllFavorites: jest.fn(),
      clearError: jest.fn(),
      error: null,
    });

    mockedUseSearchCities.mockReturnValue({
      data: [mockSearchCity],
      status: 'success',
      error: null,
    });

    mockedUseGetWeatherForMany.mockReturnValue({
      data: weatherData,
      status: 'success',
      error: null,
    });

    render(<HomeScreen navigation={mockNavigation} />);
    const input = screen.getByPlaceholderText('Search for a city');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'Test');
      jest.runAllTimers();
    });

    expect(await screen.findByText('Test City 2, US')).toBeOnTheScreen();
  });

  it('navigates to Details screen when a city is selected from search results', async () => {
    mockedUseSearchCities.mockReturnValue({
      data: [mockSearchCity],
      status: 'success',
      error: null,
    });

    render(<HomeScreen navigation={mockNavigation} />);

    const input = screen.getByPlaceholderText('Search for a city');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'Test');
      jest.runAllTimers();
    });

    const cityItem = await screen.findByText('Test City 2, US');

    fireEvent.press(cityItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      city: mockSearchCity,
    });
  });

  it('displays weather data for favorite cities', () => {
    mockedUseGetWeatherForMany.mockReturnValueOnce({
      data: weatherData,
      status: 'success',
      error: null,
    });

    render(<HomeScreen navigation={mockNavigation} />);
    const tempText = screen.getByText('0°C');

    expect(tempText).toBeOnTheScreen();
  });

  it('handles search input clear', async () => {
    render(<HomeScreen navigation={mockNavigation} />);
    const input = screen.getByPlaceholderText('Search for a city');
    fireEvent.changeText(input, 'Test');
    const clearButton = screen.getByTestId('icon-right-close');

    fireEvent.press(clearButton);

    expect(input.props.value).toBe('');
  });
});
