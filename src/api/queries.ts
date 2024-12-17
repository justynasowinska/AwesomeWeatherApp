import { useEffect, useRef } from 'react';

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

/**
 * Weather data updates roughly every 10 minutes.
 */
const TEN_MINUTES = 1000 * 60 * 10;

const useCitiesQuery = (query: string) => {
  return useQuery({
    queryKey: ['cities', query],
    queryFn: () => searchCities(query),
    enabled: query.length >= MIN_QUERY_LENGTH,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

type WeatherForCityParams = {
  lat: number;
  lon: number;
  enabled: boolean;
};

const useWeatherForCityQuery = ({
  lat,
  lon,
  enabled,
}: WeatherForCityParams) => {
  const isEnabled =
    typeof lat === 'number' && typeof lon === 'number' && enabled;

  return useQuery({
    queryKey: ['city-weather', lat, lon],
    queryFn: () => getWeatherForCity({ lat, lon }),
    enabled: isEnabled,
    staleTime: TEN_MINUTES,
  });
};

const useGetWeatherForManyQuery = (cityIds: number[]) => {
  const previousDataRef = useRef<any>(null);

  const queryResult = useQuery({
    queryKey: ['cities-weather', cityIds],
    queryFn: () => getWeatherForManyCities(cityIds),
    enabled: cityIds.length > 0,
    staleTime: TEN_MINUTES,
    placeholderData: () => {
      if (cityIds.length === 0) {
        return { list: [] };
      }

      return previousDataRef.current ?? { list: [] };
    },
  });

  useEffect(() => {
    if (queryResult.data) {
      previousDataRef.current = queryResult.data;
    } else if (cityIds.length === 0) {
      previousDataRef.current = null;
    }
  }, [queryResult.data, cityIds]);

  return queryResult;
};

export {
  MIN_QUERY_LENGTH,
  useCitiesQuery,
  useGetWeatherForManyQuery,
  useWeatherForCityQuery,
};
