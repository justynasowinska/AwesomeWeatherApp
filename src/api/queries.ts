import { useQuery } from '@tanstack/react-query';
import { searchCities } from 'api/openWeather';

/**
 * OpenWeather API requires a minimum of 3 characters in the query to return results.
 * Sending fewer characters results in a 400 error.
 */
const MIN_QUERY_LENGTH = 3;

const useCitiesQuery = (query: string) => {
  return useQuery({
    queryKey: ['cities', query],
    queryFn: ({ queryKey }) => searchCities(queryKey[1]),
    enabled: query.length >= MIN_QUERY_LENGTH,
  });
};

export { MIN_QUERY_LENGTH };
export default useCitiesQuery;
