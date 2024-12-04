import { searchCities } from 'api/openWeather';
import { useEffect, useReducer } from 'react';
import { WeatherCity } from 'types/openWeather';

type State = {
  data: WeatherCity[];
  status: 'idle' | 'fetching' | 'success' | 'error';
  error: string | null;
};

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: WeatherCity[] }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'RESET' };

const initialState: State = {
  data: [],
  status: 'idle',
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, status: 'fetching', error: null };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, status: 'error', error: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      throw new Error('Unsupported action type');
  }
};

export const useSearchCities = (query: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!query) {
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
