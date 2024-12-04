import axios from 'axios';
import Config from 'react-native-config';
import { OpenWeatherResponse } from 'types/openWeather';

const API_KEY = Config.OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const API_ENDPOINTS = {
  find: '/find',
};

const SEARCH_CITIES_DEFAULT_PARAMS = {
  type: 'like',
  sort: 'population',
  cnt: 10,
};

const searchCities = async (
  query: string,
): Promise<OpenWeatherResponse | null> => {
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

export { API_ENDPOINTS, BASE_URL, SEARCH_CITIES_DEFAULT_PARAMS, searchCities };
