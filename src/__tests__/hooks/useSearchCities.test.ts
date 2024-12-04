import { renderHook } from '@testing-library/react-hooks';
import { searchCitiesMockResponse } from '__mocks__/openWeatherResponseMock';
import { searchCities } from 'api/openWeather';
import { useSearchCities } from 'hooks/useSearchCities';

jest.mock('api/openWeather');
const mockedSearchCities = searchCities as jest.MockedFunction<
  typeof searchCities
>;

describe('useSearchCities', () => {
  it('should fetch cities when query is provided', async () => {
    mockedSearchCities.mockResolvedValueOnce(searchCitiesMockResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchCities('London'),
    );

    expect(result.current.status).toBe('fetching');
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
    await waitForNextUpdate();

    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual(searchCitiesMockResponse.list);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    mockedSearchCities.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchCities('London'),
    );

    expect(result.current.status).toBe('fetching');
    await waitForNextUpdate();

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Failed to fetch');
    expect(result.current.data).toEqual([]);
  });

  it('should reset state when query is empty', () => {
    const { result } = renderHook(() => useSearchCities(''));

    expect(result.current.status).toBe('idle');
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
