import { renderHook } from '@testing-library/react-hooks';
import { searchCitiesMockResponse } from '__mocks__/searchCitiesMockResponse';
import { searchCities } from 'api/openWeather';
import useSearchCities, { Status } from 'hooks/useSearchCities';

jest.mock('api/openWeather');
const mockedSearchCities = searchCities as jest.MockedFunction<
  typeof searchCities
>;

describe('useSearchCities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch cities when query is provided', async () => {
    mockedSearchCities.mockResolvedValueOnce(searchCitiesMockResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchCities('London'),
    );

    expect(result.current.status).toBe(Status.FETCHING);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
    await waitForNextUpdate();

    expect(result.current.status).toBe(Status.SUCCESS);
    expect(result.current.data).toEqual(searchCitiesMockResponse.list);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    mockedSearchCities.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchCities('London'),
    );

    expect(result.current.status).toBe(Status.FETCHING);
    await waitForNextUpdate();

    expect(result.current.status).toBe(Status.ERROR);
    expect(result.current.error).toBe('Failed to fetch');
    expect(result.current.data).toEqual([]);
  });

  it('should reset state when query is empty', () => {
    const { result } = renderHook(() => useSearchCities(''));

    expect(result.current.status).toBe(Status.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
