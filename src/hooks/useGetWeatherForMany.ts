import { getWeatherForManyCities } from 'api/openWeather';
import { useEffect, useReducer } from 'react';
import { OpenWeatherGroupCityWeatherResponse } from 'types/openWeather';

enum Status {
  IDLE = 'idle',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

type WeatherForCities = OpenWeatherGroupCityWeatherResponse;

type State = {
  data: WeatherForCities | null;
  status: Status;
  error: string | null;
};

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: WeatherForCities | null }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'RESET' };

const initialState: State = {
  data: null,
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
      return initialState;
    default:
      throw new Error('Unsupported action type');
  }
};

const useGetWeatherForMany = (cityIds: number[]) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!cityIds.length) {
      dispatch({ type: 'RESET' });
      return;
    }

    const fetchWeather = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await getWeatherForManyCities(cityIds);

        dispatch({ type: 'FETCH_SUCCESS', payload: result });
      } catch (error: unknown) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload:
            (error instanceof Error && error.message) ||
            'An unexpected error occurred',
        });
      }
    };

    fetchWeather();
  }, [cityIds]);

  return state;
};

export { Status };
export type { State };
export default useGetWeatherForMany;
