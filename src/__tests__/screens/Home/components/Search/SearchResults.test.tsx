import React from 'react';

import { render, screen } from '@testing-library/react-native';

import SearchResultsDropdown from 'screens/Home/components/Search/SearchResults';

import { WeatherCity } from 'types/openWeather';

const mockData: WeatherCity[] = [
  {
    id: 1,
    name: 'Test City 1',
    sys: { country: 'TC1' },
    coord: { lat: 0, lon: 0 },
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

const mockOnCitySelect = jest.fn();

describe('SearchResultsDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SearchResultsError when there is an error', () => {
    const mockError = new Error('Test error');
    render(
      <SearchResultsDropdown
        data={[]}
        error={mockError}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByText('Error: Test error')).toBeOnTheScreen();
  });

  it('renders SearchResultsItem for each city in data', () => {
    render(
      <SearchResultsDropdown
        data={mockData}
        error={null}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(screen.getByText('Test City 1, TC1')).toBeOnTheScreen();
    expect(screen.getByText('Test City 2, TC2')).toBeOnTheScreen();
  });

  it('renders SearchResultsEmpty when data is an empty array', () => {
    render(
      <SearchResultsDropdown
        data={[]}
        error={null}
        onCitySelect={mockOnCitySelect}
      />,
    );

    expect(
      screen.getByText(
        'No results yet. Keep typing or try something different.',
      ),
    ).toBeOnTheScreen();
  });
});
