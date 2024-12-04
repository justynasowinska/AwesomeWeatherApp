import { fireEvent, render, screen } from '@testing-library/react-native';
import SearchResultItem from 'components/Search/SearchResultsItem';
import React from 'react';
import { WeatherCity } from 'types/openWeather';

const mockCity: WeatherCity = {
  id: 1,
  name: 'London',
  sys: { country: 'UK' },
  coord: { lat: 12.3, lon: -45.6 },
  weather: [],
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
  },
  wind: { speed: 0, deg: 0 },
  clouds: { all: 0 },
  dt: 0,
};

describe('SearchResultItem', () => {
  it('renders correctly with city data', () => {
    render(<SearchResultItem city={mockCity} onPress={jest.fn()} />);

    expect(screen.getByText('London, UK')).toBeOnTheScreen();
    expect(screen.getByText('Lat: 12.3, Lon: -45.6')).toBeOnTheScreen();
  });

  it('calls onPress when clicked', () => {
    const handlePress = jest.fn();
    render(<SearchResultItem city={mockCity} onPress={handlePress} />);

    fireEvent.press(screen.getByText('London, UK'));

    expect(handlePress).toHaveBeenCalled();
  });
});
