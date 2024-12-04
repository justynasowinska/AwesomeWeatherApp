import {
  API_ENDPOINTS,
  BASE_URL,
  SEARCH_CITIES_DEFAULT_PARAMS,
  searchCities,
} from 'api/openWeather';
import axios from 'axios';
import { OpenWeatherResponse } from 'types/openWeather';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse: OpenWeatherResponse = {
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

describe('searchCities', () => {
  it('should fetch cities with the given query', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await searchCities('London');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/${API_ENDPOINTS.find}`,
      {
        params: {
          q: 'London',
          appid: expect.any(String),
          ...SEARCH_CITIES_DEFAULT_PARAMS,
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it('should return null if query is empty', async () => {
    const result = await searchCities('');
    expect(result).toBeNull();
  });

  it('should throw an error on failed API call', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    await expect(searchCities('London')).rejects.toThrow('API Error');
  });
});
