import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';

import useFavorites from 'hooks/useFavorites';

import { City } from 'types/openWeather';

jest.mock('context/FavoritesContext');
const mockUseAsyncStorage = useAsyncStorage as jest.MockedFunction<
  typeof useAsyncStorage
>;

describe('useFavorites hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCity: City = {
    id: 123,
    name: 'Test City',
    sys: { country: 'PL' },
    coord: { lon: 1, lat: 2 },
  };
  const secondCity: City = {
    id: 456,
    name: 'Another City',
    sys: { country: 'PL' },
    coord: { lon: 3, lat: 4 },
  };

  it('initializes with empty favorites if AsyncStorage is empty', async () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('initializes with stored favorites if AsyncStorage has data', async () => {
    const { result: preHook, waitForNextUpdate: preWaitForNextUpdate } =
      renderHook(() => useFavorites());

    preHook.current.addToFavorites(mockCity);
    await preWaitForNextUpdate();

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());
    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([mockCity]);
    expect(result.current.error).toBeNull();
  });

  it('initializes with empty favorites if AsyncStorage has invalid data', async () => {
    mockUseAsyncStorage.mockReturnValueOnce({
      getItem: jest.fn().mockResolvedValueOnce('invalid data'),
      setItem: jest.fn(),
      mergeItem: jest.fn(),
      removeItem: jest.fn(),
    });

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([]);
  });

  it('handles errors when initializing favorites', async () => {
    mockUseAsyncStorage.mockReturnValueOnce({
      getItem: jest
        .fn()
        .mockRejectedValueOnce(new Error('Failed to load favorites')),
      setItem: jest.fn(),
      mergeItem: jest.fn(),
      removeItem: jest.fn(),
    });

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    await waitForNextUpdate();

    expect(result.current.error).toBe('Failed to load favorites');
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

  it('handles errors when adding to favorites', async () => {
    mockUseAsyncStorage.mockReturnValueOnce({
      getItem: jest.fn(),
      setItem: jest
        .fn()
        .mockRejectedValueOnce(new Error('Failed to add favorite')),
      mergeItem: jest.fn(),
      removeItem: jest.fn(),
    });

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    result.current.addToFavorites(mockCity);
    await waitForNextUpdate();

    expect(result.current.error).toBe('Failed to add favorite');
  });

  it('handles errors when removing items from favorites', async () => {
    mockUseAsyncStorage.mockReturnValueOnce({
      getItem: jest.fn(),
      setItem: jest
        .fn()
        .mockRejectedValueOnce(new Error('Failed to remove favorite')),
      mergeItem: jest.fn(),
      removeItem: jest.fn(),
    });

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    result.current.removeFromFavorites(mockCity.id);
    await waitForNextUpdate();

    expect(result.current.error).toBe('Failed to remove favorite');
  });

  it('handles errors when clear favorites', async () => {
    mockUseAsyncStorage.mockReturnValueOnce({
      getItem: jest.fn(),
      setItem: jest.fn(),
      mergeItem: jest.fn(),
      removeItem: jest
        .fn()
        .mockRejectedValueOnce(new Error('Failed to remove favorite')),
    });

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    result.current.clearAllFavorites();
    await waitForNextUpdate();

    expect(result.current.error).toBe('Failed to clear favorites');
  });

  it('clears errors', async () => {
    mockUseAsyncStorage.mockReturnValue({
      getItem: jest.fn(),
      setItem: jest.fn().mockRejectedValue(new Error('Failed to add favorite')),
      mergeItem: jest.fn(),
      removeItem: jest.fn(),
    });

    const { result, waitForNextUpdate } = renderHook(() => useFavorites());

    result.current.addToFavorites(mockCity);
    await waitForNextUpdate();

    expect(result.current.error).toBe('Failed to add favorite');

    await waitFor(() => result.current.clearError());

    expect(result.current.error).toBeNull();
  });
});
