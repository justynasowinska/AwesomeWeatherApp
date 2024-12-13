import { fireEvent, render, screen } from '@testing-library/react-native';

import { FavoritesList } from 'components/FavoritesList';

import { WeatherCity } from 'types/openWeather';


const mockFavorites: WeatherCity[] = [
  {
    id: 1,
    name: 'Test City 1',
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
  },
  {
    id: 2,
    name: 'Test City 2',
    coord: { lat: 0, lon: 0 },
    main: {
      temp: 273.15,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    weather: [{ id: 2, main: 'Clear', icon: '01d', description: 'Clear sky' }],
    sys: { country: 'TC' },
    dt: 0,
    wind: { speed: 0, deg: 0 },
    clouds: { all: 0 },
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
        isLoading={false}
        error={null}
      />,
    );

    expect(screen.getByText('Test City 1, TC')).toBeOnTheScreen();
    expect(screen.getByText('Test City 2, TC')).toBeOnTheScreen();
  });

  it('renders an empty message when no favorites are available', () => {
    render(
      <FavoritesList
        favorites={[]}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
        isLoading={false}
        error={null}
      />,
    );

    expect(screen.getByText('No favorite cities yet.')).toBeOnTheScreen();
  });

  it('renders a loading message when the list is loading', () => {
    render(
      <FavoritesList
        favorites={[]}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
        isLoading
        error={null}
      />,
    );

    expect(screen.getByText('Loading Your Favorites...')).toBeOnTheScreen();
  });

  it('renders an error message when an error occurs', () => {
    render(
      <FavoritesList
        favorites={[]}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
        isLoading={false}
        error="An error occurred."
      />,
    );

    expect(screen.getByText('An error occurred.')).toBeOnTheScreen();
  });

  it('calls onCitySelect with city data when a city is pressed', () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onCitySelect={mockOnCitySelect}
        isLoading={false}
        error={null}
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
        isLoading={false}
        error={null}
      />,
    );

    const heartIcon = screen.getAllByTestId('favorite-icon')[0];
    fireEvent.press(heartIcon);
    expect(mockOnRemove).toHaveBeenCalledWith(mockFavorites[0].id);
  });
});
