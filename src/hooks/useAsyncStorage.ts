import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';

const useAsyncStorage = <T>(key: string) => {
  const [storedValue, setStoredValue] = useState<T | null>(null);

  const load = useCallback(async () => {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      setStoredValue(JSON.parse(value));
    }
  }, [key]);

  const save = useCallback(
    async (value: T) => {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    },
    [key],
  );

  const clearAll = useCallback(async () => {
    await AsyncStorage.removeItem(key);
    setStoredValue(null);
  }, [key]);

  return { value: storedValue, save, load, clearAll };
};

export default useAsyncStorage;
