import React from 'react';

import { render, screen } from '@testing-library/react-native';

import WeatherContent from 'screens/Details/components/WeatherContent';

import { OpenWeatherCityWeatherResponse } from 'types/openWeather';

describe('WeatherContent', () => {
  it('renders ActivityIndicator when isLoading is true', () => {
    render(<WeatherContent isLoading={true} error={null} data={null} />);

    expect(screen.getByLabelText('Loading weather data')).toBeOnTheScreen();
  });

  it('renders ErrorMessage when there is an error', () => {
    const mockError = new Error('Test error');
    render(<WeatherContent isLoading={false} error={mockError} data={null} />);

    expect(screen.getByText('Test error')).toBeOnTheScreen();
  });

  it('renders ErrorMessage when data is null and error is null', () => {
    render(<WeatherContent isLoading={false} error={null} data={null} />);

    expect(screen.getByText('Failed to load weather data.')).toBeOnTheScreen();
  });

  it('renders weather details when data is provided', () => {
    const mockData: OpenWeatherCityWeatherResponse = {
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
      weather: [
        { id: 1, main: 'Clear', icon: '01d', description: 'Clear sky' },
      ],
      sys: { country: 'TC' },
      dt: 0,
      wind: { speed: 0, deg: 0 },
      clouds: { all: 0 },
      base: '',
      visibility: 0,
      timezone: 0,
      cod: 0,
    };

    render(<WeatherContent isLoading={false} error={null} data={mockData} />);

    expect(screen.getByText('Clear sky')).toBeOnTheScreen();
    expect(screen.getByText('0°C')).toBeOnTheScreen();
  });
});
