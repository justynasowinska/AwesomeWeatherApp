import { OPEN_WEATHER_API_KEY } from '@env';
import axios from 'axios';
import {
  Coordinates,
  OpenWeatherCityWeatherResponse,
  OpenWeatherSearchCityResponse,
} from 'types/openWeather';

const API_KEY = OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const API_ENDPOINTS = {
  find: '/find',
  weather: '/weather',
};

const SEARCH_CITIES_DEFAULT_PARAMS = {
  type: 'like',
  sort: 'population',
  cnt: 10,
};

const searchCities = async (
  query: string,
): Promise<OpenWeatherSearchCityResponse | null> => {
  if (!query) {
    return null;
  }

  const { data } = await axios.get(`${BASE_URL}/${API_ENDPOINTS.find}`, {
    params: {
      q: query,
      appid: API_KEY,
      ...SEARCH_CITIES_DEFAULT_PARAMS,
    },
  });

  return data;
};

const getWeatherForCity = async ({
  lat,
  lon,
}: Coordinates): Promise<OpenWeatherCityWeatherResponse> => {
  const { data } = await axios.get(`${BASE_URL}/${API_ENDPOINTS.weather}`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
    },
  });
  return data;
};

export {
  API_ENDPOINTS,
  BASE_URL,
  getWeatherForCity,
  SEARCH_CITIES_DEFAULT_PARAMS,
  searchCities,
};
