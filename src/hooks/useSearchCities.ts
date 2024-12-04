import { searchCities } from 'api/openWeather';
import { useEffect, useReducer } from 'react';
import { WeatherCity } from 'types/openWeather';

enum Status {
  IDLE = 'idle',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

type State = {
  data: WeatherCity[];
  status: Status;
  error: string | null;
};

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: WeatherCity[] }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'RESET' };

const initialState: State = {
  data: [],
  status: Status.IDLE,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, status: Status.FETCHING, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, status: Status.SUCCESS, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, status: Status.ERROR, error: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      throw new Error('Unsupported action type');
  }
};

/**
 * OpenWeather API requires a minimum of 3 characters in the query to return results.
 * Sending fewer characters results in a 400 error.
 */
const MIN_QUERY_LENGTH = 3;

const useSearchCities = (query: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!query || query.length < MIN_QUERY_LENGTH) {
      dispatch({ type: 'RESET' });
      return;
    }

    const fetchCities = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await searchCities(query);
        dispatch({ type: 'FETCH_SUCCESS', payload: result?.list || [] });
      } catch (error: unknown) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload:
            (error instanceof Error && error.message) ||
            'An unexpected error occurred',
        });
      }
    };

    fetchCities();
  }, [query]);

  return state;
};

export { MIN_QUERY_LENGTH, Status };
export type { State };
export default useSearchCities;
