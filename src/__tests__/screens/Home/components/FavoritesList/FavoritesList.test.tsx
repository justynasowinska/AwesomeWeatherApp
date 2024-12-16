import { render, screen } from '@testing-library/react-native';

import { FavoritesList } from 'screens/Home/components/FavoritesList';

import { WeatherCity } from 'types/openWeather';

const mockFavorites: WeatherCity[] = [
  {
    id: 1,
    name: 'Test City 1',
    coord: { lat: 0, lon: 0 },
    sys: { country: 'TC1' },
    weather: [{ id: 1, icon: '01d', main: 'Clear', description: 'clear sky' }],
    main: {
      temp: 300,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    dt: 0,
    wind: { speed: 0, deg: 0 },
    clouds: { all: 0 },
  },
  {
    id: 2,
    name: 'Test City 2',
    coord: { lat: 0, lon: 0 },
    sys: { country: 'TC2' },
    weather: [
      { id: 2, icon: '02d', main: 'Clouds', description: 'few clouds' },
    ],
    main: {
      temp: 290,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    dt: 0,
    wind: { speed: 0, deg: 0 },
    clouds: { all: 0 },
  },
];

const mockOnRemove = jest.fn();
const mockOnCitySelect = jest.fn();

describe('FavoritesList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FavoriteListLoading when isLoading is true and favorites is null', () => {
    render(
      <FavoritesList
        favorites={null}
        isLoading={true}
        error={null}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByTestId('favorite-list-loading')).toBeOnTheScreen();
  });

  it('renders FavoriteListError when there is an error', () => {
    const mockError = new Error('Test error');
    render(
      <FavoritesList
        favorites={null}
        isLoading={false}
        error={mockError}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByText('Test error')).toBeOnTheScreen();
  });

  it('renders FavoriteCityItem for each favorite city', () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        isLoading={false}
        error={null}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByText('Test City 1, TC1')).toBeOnTheScreen();
    expect(screen.getByText('Test City 2, TC2')).toBeOnTheScreen();
  });

  it('renders FavoriteListEmpty when favorites is an empty array', () => {
    render(
      <FavoritesList
        favorites={[]}
        isLoading={false}
        error={null}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByText('No favorite cities yet.')).toBeOnTheScreen();
  });
});
