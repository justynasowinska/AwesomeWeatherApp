import React from 'react';

import { render, screen } from '@testing-library/react-native';

import WeatherDetails from 'screens/Details/components/WeatherDetails';
import {
  createWeatherDescription,
  getWeatherIconUrl,
  kelvinToCelsius,
} from 'utils/openWeatherHelpers';

import { Weather } from 'types/openWeather';

jest.mock('utils/openWeatherHelpers', () => ({
  getWeatherIconUrl: jest.fn(),
  kelvinToCelsius: jest.fn(),
  createWeatherDescription: jest.fn(),
}));

const getWeatherIconUrlMock = getWeatherIconUrl as jest.Mock;
const kelvinToCelsiusMock = kelvinToCelsius as jest.Mock;
const createWeatherDescriptionMock = createWeatherDescription as jest.Mock;

describe('WeatherDetails', () => {
  const mockIcon = '01d';
  const mockTemperature = 300;
  const mockWeathers: Weather[] = [
    { id: 1, main: 'Clear', description: 'clear sky', icon: '01d' },
  ];

  beforeEach(() => {
    getWeatherIconUrlMock.mockReturnValue('mocked_url');
    kelvinToCelsiusMock.mockReturnValue(27);
    createWeatherDescriptionMock.mockReturnValue('Clear sky');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(
      <WeatherDetails
        icon={mockIcon}
        temperature={mockTemperature}
        weathers={mockWeathers}
      />,
    );

    expect(screen.getByText('27°C')).toBeOnTheScreen();
    expect(screen.getByText('Clear sky')).toBeOnTheScreen();
    expect(screen.getByTestId('avatar-image').props.source.uri).toBe(
      'mocked_url',
    );
  });

  it('calls kelvinToCelsius with the correct temperature', () => {
    render(
      <WeatherDetails
        icon={mockIcon}
        temperature={mockTemperature}
        weathers={mockWeathers}
      />,
    );
    expect(kelvinToCelsius).toHaveBeenCalledWith(mockTemperature);
  });

  it('calls getWeatherIconUrl with the correct icon', () => {
    render(
      <WeatherDetails
        icon={mockIcon}
        temperature={mockTemperature}
        weathers={mockWeathers}
      />,
    );
    expect(getWeatherIconUrl).toHaveBeenCalledWith(mockIcon);
  });

  it('calls createWeatherDescription with the correct weathers', () => {
    render(
      <WeatherDetails
        icon={mockIcon}
        temperature={mockTemperature}
        weathers={mockWeathers}
      />,
    );
    expect(createWeatherDescription).toHaveBeenCalledWith(mockWeathers);
  });
});
