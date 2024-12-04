import { searchCitiesMockResponse } from '__mocks__/openWeatherResponseMock';
import {
  API_ENDPOINTS,
  BASE_URL,
  SEARCH_CITIES_DEFAULT_PARAMS,
  searchCities,
} from 'api/openWeather';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('searchCities', () => {
  it('should fetch cities with the given query', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: searchCitiesMockResponse });

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
    expect(result).toEqual(searchCitiesMockResponse);
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
