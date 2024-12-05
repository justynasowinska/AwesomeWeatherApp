import { getWeatherForCity } from 'api/openWeather';
import { useEffect, useReducer } from 'react';
import { Coordinates, OpenWeatherCityWeatherResponse } from 'types/openWeather';

enum Status {
  IDLE = 'idle',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

// TODO: Narrow it down later
type WeatherForCityData = OpenWeatherCityWeatherResponse;

type State = {
  data: WeatherForCityData | null;
  status: Status;
  error: string | null;
};

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: WeatherForCityData }
  | { type: 'FETCH_FAILURE'; payload: string };

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
    default:
      throw new Error('Unsupported action type');
  }
};

const useGetWeatherForCity = (
  lat: Coordinates['lat'],
  lon: Coordinates['lon'],
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof lat !== 'number' || typeof lon !== 'number') {
      return;
    }

    const fetchWeather = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await getWeatherForCity({ lat, lon });
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
  }, [lat, lon]);

  return state;
};

export { Status };
export type { State };
export default useGetWeatherForCity;
