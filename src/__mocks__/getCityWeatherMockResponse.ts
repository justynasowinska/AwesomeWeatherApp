import { OpenWeatherCityWeatherResponse } from 'types/openWeather';

export const getCityWeatherMockResponse: OpenWeatherCityWeatherResponse = {
  coord: {
    lat: 51.51,
    lon: -0.13,
  },
  weather: [
    {
      id: 300,
      main: 'Drizzle',
      description: 'light intensity drizzle',
      icon: '09d',
    },
  ],
  base: 'stations',
  main: {
    temp: 280.32,
    feels_like: 276.99,
    temp_min: 279.82,
    temp_max: 281.71,
    pressure: 1016,
    humidity: 93,
  },
  visibility: 10000,
  wind: {
    speed: 4.1,
    deg: 80,
  },
  clouds: {
    all: 90,
  },
  dt: 1485789600,
  sys: {
    type: 1,
    id: 5091,
    country: 'GB',
    sunrise: 1485762037,
    sunset: 1485794875,
  },
  timezone: 0,
  id: 2643743,
  name: 'London',
  cod: 200,
};
