import { useRoute } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useFavoritesContext } from 'context/FavoritesContext';
import useGetWeatherForCity, { Status } from 'hooks/useGetWeatherForCity';
import React from 'react';
import { IconButton } from 'react-native-paper';
import DetailsScreen from 'screens/DetailsScreen';
import { City } from 'types/openWeather';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('context/FavoritesContext');
const mockedUseFavoritesContext = useFavoritesContext as jest.Mock;

jest.mock('hooks/useGetWeatherForCity');
const mockedUseGetWeatherForCity = useGetWeatherForCity as jest.Mock;

describe('DetailsScreen', () => {
  const mockCity: City = {
    id: 1,
    name: 'Test City',
    sys: { country: 'PL' },
    coord: { lat: 1, lon: 2 },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRoute as jest.Mock).mockReturnValue({ params: { city: mockCity } });

    mockedUseFavoritesContext.mockReturnValue({
      favorites: [],
      addToFavorites: jest.fn(),
      removeFromFavorites: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });

    mockedUseGetWeatherForCity.mockReturnValue({
      data: null,
      status: Status.FETCHING,
    });
  });

  it('displays loading indicator when status is FETCHING', () => {
    render(<DetailsScreen />);
    expect(screen.getByRole('progressbar')).toBeOnTheScreen();
  });

  it('displays error message when status is ERROR', () => {
    mockedUseGetWeatherForCity.mockReturnValueOnce({
      data: [],
      status: Status.ERROR,
    });
    render(<DetailsScreen />);
    expect(screen.getByText('Failed to load weather data.')).toBeOnTheScreen();
  });

  it('displays weather information when status is SUCCESS and data are present', () => {
    mockedUseGetWeatherForCity.mockReturnValueOnce({
      data: {
        weather: [{ icon: '01d', description: 'clear sky' }],
        main: { temp: 273.15 },
      },
      status: Status.SUCCESS,
    });

    render(<DetailsScreen />);

    expect(screen.getByText('0°C')).toBeOnTheScreen();
    expect(screen.getByText('Clear sky')).toBeOnTheScreen();
  });

  it('does not display weather information when status is SUCCESS but data are missing', () => {
    mockedUseGetWeatherForCity.mockReturnValueOnce({
      data: null,
      status: Status.SUCCESS,
    });

    render(<DetailsScreen />);

    expect(screen.queryByText('0°C')).not.toBeOnTheScreen();
    expect(screen.queryByText('Clear sky')).not.toBeOnTheScreen();
  });

  it('shows heart icon if city is not favorite and adds it when pressed', () => {
    const addToFavoritesMock = jest.fn();
    mockedUseFavoritesContext.mockReturnValueOnce({
      favorites: [],
      addToFavorites: addToFavoritesMock,
      removeFromFavorites: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });

    render(<DetailsScreen />);
    const favoriteButton = screen.UNSAFE_getByType(IconButton);
    expect(favoriteButton.props.icon).toBe('heart-outline');

    fireEvent.press(favoriteButton);
    expect(addToFavoritesMock).toHaveBeenCalledWith({
      id: mockCity.id,
      name: mockCity.name,
      coord: mockCity.coord,
      sys: mockCity.sys,
    });
  });

  it('shows heart icon if city is already favorite and removes it when pressed', () => {
    const removeFromFavoritesMock = jest.fn();
    mockedUseFavoritesContext.mockReturnValueOnce({
      favorites: [mockCity],
      addToFavorites: jest.fn(),
      removeFromFavorites: removeFromFavoritesMock,
      error: null,
      clearError: jest.fn(),
    });

    render(<DetailsScreen />);
    const favoriteButton = screen.UNSAFE_getByType(IconButton);
    expect(favoriteButton.props.icon).toBe('heart');

    fireEvent.press(favoriteButton);
    expect(removeFromFavoritesMock).toHaveBeenCalledWith(mockCity.id);
  });
});
