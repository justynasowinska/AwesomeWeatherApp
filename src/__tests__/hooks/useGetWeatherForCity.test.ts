import { renderHook } from '@testing-library/react-hooks';
import { getCityWeatherMockResponse } from '__mocks__/getCityWeatherMockResponse';
import { getWeatherForCity } from 'api/openWeather';
import useGetWeatherForCity, { Status } from 'hooks/useGetWeatherForCity';

jest.mock('api/openWeather');
const mockedGetWeatherForCity = getWeatherForCity as jest.MockedFunction<
  typeof getWeatherForCity
>;

describe('useGetWeatherForCity', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data successfully', async () => {
    mockedGetWeatherForCity.mockResolvedValueOnce(getCityWeatherMockResponse);
    const { lat, lon } = getCityWeatherMockResponse.coord;

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetWeatherForCity(lat, lon),
    );

    expect(result.current.status).toBe(Status.FETCHING);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    await waitForNextUpdate();

    expect(result.current.status).toBe(Status.SUCCESS);
    expect(result.current.data).toEqual(getCityWeatherMockResponse);
    expect(result.current.error).toBeNull();

    expect(mockedGetWeatherForCity).toHaveBeenCalledWith({
      lat,
      lon,
    });
  });

  it('should handle errors', async () => {
    mockedGetWeatherForCity.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetWeatherForCity(0, 0),
    );

    expect(result.current.status).toBe(Status.FETCHING);

    await waitForNextUpdate();

    expect(result.current.status).toBe(Status.ERROR);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Failed to fetch');
  });

  it('should not fetch data if lat or lon are missing', () => {
    const { result: resultWithoutBoth } = renderHook(() =>
      useGetWeatherForCity(undefined as any, undefined as any),
    );

    expect(resultWithoutBoth.current.status).toBe(Status.IDLE);
    expect(mockedGetWeatherForCity).not.toHaveBeenCalled();

    const { result: resultWithoutLon } = renderHook(() =>
      useGetWeatherForCity(10, undefined as any),
    );

    expect(resultWithoutLon.current.status).toBe(Status.IDLE);
    expect(mockedGetWeatherForCity).not.toHaveBeenCalled();

    const { result: resultWithoutlat } = renderHook(() =>
      useGetWeatherForCity(undefined as any, 10),
    );

    expect(resultWithoutlat.current.status).toBe(Status.IDLE);
    expect(mockedGetWeatherForCity).not.toHaveBeenCalled();
  });
});
