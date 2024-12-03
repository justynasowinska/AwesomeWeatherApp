import axios from 'axios';
import Config from 'react-native-config';
import { OpenWeatherResponse } from 'types/openWeather';

const API_KEY = Config.OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const API_ENDPOINTS = {
  find: '/find',
};

export const searchCities = async (
  query: string,
): Promise<OpenWeatherResponse> => {
  if (!query) {
    throw new Error('Query is required');
  }
  const { data } = await axios.get(`${BASE_URL}/${API_ENDPOINTS.find}`, {
    params: {
      q: query,
      appid: API_KEY,
      type: 'like',
      sort: 'population',
      cnt: 10,
    },
  });

  return data;
};
