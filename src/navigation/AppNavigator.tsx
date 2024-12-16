import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import { ErrorBoundary } from 'components/ErrorBoundary';

import { City } from 'types/openWeather';

import DetailsScreen from '../screens/Details/Details';
import HomeScreen from '../screens/Home/Home';

export type RootStackParamList = {
  Home: undefined;
  Details: { city: City };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colors } = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ErrorBoundary navigator={navigator}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTransparent: true, title: '' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerTintColor: colors.primary,
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
      </Stack.Navigator>
    </ErrorBoundary>
  );
};

export default AppNavigator;
