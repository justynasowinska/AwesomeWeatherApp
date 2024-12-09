import { renderHook } from '@testing-library/react-hooks';
import { searchCitiesMockResponse } from '__mocks__/searchCitiesMockResponse';
import { getWeatherForManyCities } from 'api/openWeather';
import { Status } from 'hooks/useGetWeatherForCity';
import useGetWeatherForMany from 'hooks/useGetWeatherForMany';

jest.mock('api/openWeather');
const mockedGetWeatherForManyCities =
  getWeatherForManyCities as jest.MockedFunction<
    typeof getWeatherForManyCities
  >;

describe('useGetWeatherForManyCities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data successfully', async () => {
    mockedGetWeatherForManyCities.mockResolvedValueOnce({
      cnt: 3,
      list: searchCitiesMockResponse.list,
    });

    const cityIds = [1, 2, 3];

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetWeatherForMany(cityIds),
    );

    expect(result.current.status).toBe(Status.FETCHING);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    await waitForNextUpdate();

    expect(result.current.status).toBe(Status.SUCCESS);
    expect(result.current.data).toEqual({
      cnt: 3,
      list: searchCitiesMockResponse.list,
    });
    expect(result.current.error).toBeNull();

    expect(mockedGetWeatherForManyCities).toHaveBeenCalledWith(cityIds);
  });

  it('should handle errors', async () => {
    mockedGetWeatherForManyCities.mockRejectedValueOnce(
      new Error('Failed to fetch'),
    );

    const cityIds = [4, 5, 6];

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetWeatherForMany(cityIds),
    );

    expect(result.current.status).toBe(Status.FETCHING);

    await waitForNextUpdate();

    expect(result.current.status).toBe(Status.ERROR);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Failed to fetch');
  });

  it('should not fetch data if there is no ids for cities', () => {
    const { result } = renderHook(() => useGetWeatherForMany([]));

    expect(result.current.status).toBe(Status.IDLE);
    expect(mockedGetWeatherForManyCities).not.toHaveBeenCalled();
  });
});
