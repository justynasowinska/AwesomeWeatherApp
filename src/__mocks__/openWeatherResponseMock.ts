import { OpenWeatherResponse } from 'types/openWeather';

export const searchCitiesMockResponse: OpenWeatherResponse = {
  message: 'accurate',
  cod: '200',
  count: 1,
  list: [
    {
      id: 1,
      name: 'London',
      coord: { lat: 0, lon: 0 },
      main: {
        temp: 300,
        feels_like: 300,
        temp_min: 298,
        temp_max: 302,
        pressure: 1000,
        humidity: 80,
      },
      dt: 1620000000,
      wind: { speed: 5, deg: 200 },
      sys: { country: 'UK' },
      clouds: { all: 0 },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
    },
  ],
};
