import { fireEvent, render, screen } from '@testing-library/react-native';
import FavoritesList from 'components/FavoritesList';
import React from 'react';
import { City } from 'types/openWeather';

const mockFavorites: City[] = [
  {
    id: 1,
    name: 'Test City 1',
    coord: { lat: 0, lon: 0 },
    sys: { country: 'TC' },
  },
  {
    id: 2,
    name: 'Test City 2',
    coord: { lat: 10, lon: 10 },
    sys: { country: 'TC' },
  },
];

describe('FavoritesList', () => {
  const mockOnRemove = jest.fn();
  const mockOnCitySelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header and the list of favorite cities', () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByText('Your Favorites Places:')).toBeOnTheScreen();
    expect(screen.getByText('Test City 1, TC')).toBeOnTheScreen();
    expect(screen.getByText('Test City 2, TC')).toBeOnTheScreen();
  });

  it('renders an empty message when no favorites are available', () => {
    render(
      <FavoritesList
        favorites={[]}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByText('No favorite cities yet.')).toBeOnTheScreen();
  });

  it('calls onCitySelect with city data when a city is pressed', () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    fireEvent.press(screen.getByText('Test City 1, TC'));
    expect(mockOnCitySelect).toHaveBeenCalledWith(mockFavorites[0]);
  });

  it('calls onRemove with city id when the "favorite" icon is pressed', () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    const heartIcon = screen.getAllByTestId('favorite-icon')[0];
    fireEvent.press(heartIcon);
    expect(mockOnRemove).toHaveBeenCalledWith(mockFavorites[0].id);
  });
});
