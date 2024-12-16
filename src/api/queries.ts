import { useQuery } from '@tanstack/react-query';

import {
  getWeatherForCity,
  getWeatherForManyCities,
  searchCities,
} from 'api/openWeather';

/**
 * OpenWeather API requires a minimum of 3 characters in the query to return results.
 * Sending fewer characters results in a 400 error.
 */
const MIN_QUERY_LENGTH = 3;

const useCitiesQuery = (query: string) => {
  return useQuery({
    queryKey: ['cities', query],
    queryFn: () => searchCities(query),
    enabled: query.length >= MIN_QUERY_LENGTH,
  });
};

type WeatherForCityParams = {
  lat: number;
  lon: number;
};

const useWeatherForCityQuery = ({ lat, lon }: WeatherForCityParams) => {
  return useQuery({
    queryKey: ['city-weather', lat, lon],
    queryFn: () => getWeatherForCity({ lat, lon }),
    enabled: typeof lat === 'number' && typeof lon === 'number',
  });
};

const useGetWeatherForManyQuery = (cityIds: number[]) => {
  return useQuery({
    queryKey: ['cities-weather', cityIds],
    queryFn: () => getWeatherForManyCities(cityIds),
    enabled: cityIds.length > 0,
  });
};

export {
  MIN_QUERY_LENGTH,
  useCitiesQuery,
  useGetWeatherForManyQuery,
  useWeatherForCityQuery,
};
