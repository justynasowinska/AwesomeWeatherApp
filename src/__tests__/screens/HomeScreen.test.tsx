import { NavigationProp } from '@react-navigation/native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { useFavoritesContext } from 'context/FavoritesContext';
import useSearchCities from 'hooks/useSearchCities';
import { RootStackParamList } from 'navigation/AppNavigator';
import React from 'react';
import HomeScreen from 'screens/HomeScreen';
import { City } from 'types/openWeather';

// Mock useFavoritesContext
jest.mock('context/FavoritesContext');
const mockedUseFavoritesContext = useFavoritesContext as jest.Mock;

// Mock useSearchCities
jest.mock('hooks/useSearchCities');
const mockedUseSearchCities = useSearchCities as jest.Mock;

const mockNavigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<RootStackParamList, 'Home'>;

jest.useFakeTimers();

describe('HomeScreen', () => {
  const mockCity: City = {
    id: 1,
    name: 'Test City',
    sys: { country: 'US' },
    coord: { lon: -74, lat: 40 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();

    mockedUseFavoritesContext.mockReturnValue({
      favorites: [mockCity],
      removeFromFavorites: jest.fn(),
      addToFavorites: jest.fn(),
      clearAllFavorites: jest.fn(),
      clearError: jest.fn(),
      error: null,
    });

  });

  it('renders the search and favorites list components', () => {
    mockedUseSearchCities.mockReturnValueOnce({
      data: [],
      status: 'idle',
      error: null,
    });

    render(<HomeScreen navigation={mockNavigation} />);

    expect(screen.getByTestId('search-view')).toBeOnTheScreen();
    expect(screen.getByTestId('favorites-list')).toBeOnTheScreen();
  });

  it('updates query on input change and shows results when length >= MIN_QUERY_LENGTH', async () => {
    mockedUseSearchCities.mockReturnValue({
      data: [mockCity],
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

    expect(await screen.findByTestId('search-results')).toBeOnTheScreen();
  });

  it('clears input and query when clear button is pressed', async () => {
    render(<HomeScreen navigation={mockNavigation} />);
    const input = screen.getByPlaceholderText('Search for a city');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.changeText(input, 'Test');
      jest.runAllTimers();
    });

    const clearButton = screen.getByTestId('icon-right-close');
    fireEvent.press(clearButton);

    expect(input).toHaveProp('value', '');
  });
});
