import { fireEvent, render, screen } from '@testing-library/react-native';

import { FavoriteCityItem } from 'screens/Home/components/FavoritesList';

import { WeatherCity } from 'types/openWeather';

const mockCity: WeatherCity = {
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
  weather: [{ id: 1, main: 'Clear', icon: '01d', description: 'Clear sky' }],
  sys: { country: 'TC' },
  dt: 0,
  wind: { speed: 0, deg: 0 },
  clouds: { all: 0 },
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
    expect(screen.getByText('Clear sky')).toBeOnTheScreen();
    expect(screen.getByText('0°C')).toBeOnTheScreen();
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
