import { fireEvent, render, screen } from '@testing-library/react-native';
import { FavoriteCityItem } from 'components/FavoritesList';

import React from 'react';
import { City } from 'types/openWeather';

const mockCity: City = {
  id: 1,
  name: 'Test City',
  coord: { lat: 0, lon: 0 },
  sys: { country: 'TC' },
};

describe('FavoriteCityItem', () => {
  const mockOnRemove = jest.fn();
  const mockOnPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the city details correctly', () => {
    render(
      <FavoriteCityItem
        city={mockCity}
        onRemove={mockOnRemove}
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText('Test City, TC')).toBeOnTheScreen();
    expect(screen.getByText('Lat: 0, Lon: 0')).toBeOnTheScreen();
  });

  it('calls onPress with city data when the item is pressed', () => {
    render(
      <FavoriteCityItem
        city={mockCity}
        onRemove={mockOnRemove}
        onPress={mockOnPress}
      />,
    );

    fireEvent.press(screen.getByText('Test City, TC'));
    expect(mockOnPress).toHaveBeenCalledWith(mockCity);
  });

  it('calls onRemove with city id when the "favorite" icon is pressed', () => {
    render(
      <FavoriteCityItem
        city={mockCity}
        onRemove={mockOnRemove}
        onPress={mockOnPress}
      />,
    );

    const heartIcon = screen.getByTestId('favorite-icon');
    fireEvent.press(heartIcon);
    expect(mockOnRemove).toHaveBeenCalledWith(mockCity.id);
  });
});
