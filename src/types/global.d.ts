declare module '@env' {
  export const OPEN_WEATHER_API_KEY: string;
}

declare module '@react-native-community/netinfo/jest/netinfo-mock.js' {
  import { NetInfoState } from '@react-native-community/netinfo';

  const mockedNetInfo: {
    useNetInfo: () => NetInfoState;
  };

  export default mockedNetInfo;
}
