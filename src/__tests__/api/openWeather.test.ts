import { getCityWeatherMockResponse } from '__mocks__/getCityWeatherMockResponse';
import { searchCitiesMockResponse } from '__mocks__/searchCitiesMockResponse';
import {
  API_ENDPOINTS,
  BASE_URL,
  getWeatherForCity,
  getWeatherForManyCities,
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

describe('getWeatherForCity', () => {
  it('should fetch weather data for a given city', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: getCityWeatherMockResponse });
    const { lat, lon } = getCityWeatherMockResponse.coord;

    const result = await getWeatherForCity({
      lat,
      lon,
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/${API_ENDPOINTS.weather}`,
      {
        params: {
          lat,
          lon,
          appid: expect.any(String),
        },
      },
    );
    expect(result).toEqual(getCityWeatherMockResponse);
  });

  it('should throw an error on failed API call', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(getWeatherForCity({ lat: 0, lon: 0 })).rejects.toThrow(
      'API Error',
    );
  });
});

describe('getWeatherForManyCities', () => {
  it('should fetch weather data for multiple cities', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        cnt: searchCitiesMockResponse.count,
        list: searchCitiesMockResponse.list,
      },
    });
    const cityIds = [1, 2, 3];

    const result = await getWeatherForManyCities(cityIds);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/${API_ENDPOINTS.group}`,
      {
        params: {
          id: '1,2,3',
          appid: expect.any(String),
        },
      },
    );
    expect(result).toEqual({
      cnt: searchCitiesMockResponse.count,
      list: searchCitiesMockResponse.list,
    });
  });

  it('should throw an error on failed API call', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(getWeatherForManyCities([1, 2, 3])).rejects.toThrow(
      'API Error',
    );
  });
});
