import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import '@testing-library/react-native/extend-expect';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.useFakeTimers();
