import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { Search } from 'screens/Home/components/Search';

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

const mockOnInputChange = jest.fn();
const mockOnCitySelect = jest.fn();
const mockOnInputClear = jest.fn();

describe('Search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SearchResults when showResults is true', () => {
    render(
      <Search
        inputValue="Test"
        data={mockData}
        isLoading={false}
        error={null}
        showResults={true}
        onInputChange={mockOnInputChange}
        onCitySelect={mockOnCitySelect}
        onInputClear={mockOnInputClear}
      />,
    );

    expect(screen.getByTestId('search-results')).toBeOnTheScreen();
  });

  it('does not render SearchResults when showResults is false', () => {
    render(
      <Search
        inputValue="Test"
        data={mockData}
        isLoading={false}
        error={null}
        showResults={false}
        onInputChange={mockOnInputChange}
        onCitySelect={mockOnCitySelect}
        onInputClear={mockOnInputClear}
      />,
    );

    expect(screen.queryByTestId('search-results')).not.toBeOnTheScreen();
  });

  it('calls onInputChange when input value changes', () => {
    render(
      <Search
        inputValue="Test"
        data={mockData}
        isLoading={false}
        error={null}
        showResults={true}
        onInputChange={mockOnInputChange}
        onCitySelect={mockOnCitySelect}
        onInputClear={mockOnInputClear}
      />,
    );

    fireEvent.changeText(screen.getByTestId('search-input'), 'New Test');
    expect(mockOnInputChange).toHaveBeenCalledWith('New Test');
  });

  it('calls onInputClear when clear button is pressed', () => {
    render(
      <Search
        inputValue="Test"
        data={mockData}
        isLoading={false}
        error={null}
        showResults={true}
        onInputChange={mockOnInputChange}
        onCitySelect={mockOnCitySelect}
        onInputClear={mockOnInputClear}
      />,
    );

    fireEvent.press(screen.getByTestId('icon-right-close'));
    expect(mockOnInputClear).toHaveBeenCalled();
  });

  it('calls onCitySelect when a city is selected from the results', () => {
    render(
      <Search
        inputValue="Test"
        data={mockData}
        isLoading={false}
        error={null}
        showResults={true}
        onInputChange={mockOnInputChange}
        onCitySelect={mockOnCitySelect}
        onInputClear={mockOnInputClear}
      />,
    );

    fireEvent.press(screen.getByText('Test City 1, TC1'));
    expect(mockOnCitySelect).toHaveBeenCalledWith(mockData[0]);
  });
});
