import { renderHook } from '@testing-library/react-hooks';
import useFavorites from 'hooks/useFavorites';
import { City } from 'types/openWeather';

describe('useFavorites hook', () => {
  const mockCity: City = { id: 123, name: 'Test City', sys: { country: 'PL' }, coord: { lon: 1, lat: 2 } };
  const secondCity: City = { id: 456, name: 'Another City', sys: { country: 'PL' }, coord: { lon: 3, lat: 4 } };

  it('initializes with empty favorites if AsyncStorage is empty', async () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('initializes with stored favorites if AsyncStorage has data', async () => {
    const { result: preHook, waitForNextUpdate: preWaitForNextUpdate } = renderHook(() => useFavorites());

    preHook.current.addToFavorites(mockCity);
    await preWaitForNextUpdate();

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([mockCity]);
    expect(result.current.error).toBeNull();
  });

  it('adds a given city to favorites', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    result.current.addToFavorites(mockCity);
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([mockCity]);
    expect(result.current.error).toBeNull();
  });

  it('removes a given city from favorites', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    result.current.addToFavorites(secondCity);
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([secondCity]);

    result.current.removeFromFavorites(secondCity.id);
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([]);
  });

  it('clears all favorites', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    result.current.addToFavorites(mockCity);
    await waitForNextUpdate();

    result.current.addToFavorites(secondCity);
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([mockCity, secondCity]);

    result.current.clearAllFavorites();
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
