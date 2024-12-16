import { useCallback } from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import { ErrorBoundary } from 'components/ErrorBoundary';
import { FavoritesButton } from 'components/FavoritesButton';

import { City } from 'types/openWeather';

import DetailsScreen from '../screens/Details/Details';
import HomeScreen from '../screens/Home/Home';

export type RootStackParamList = {
  Home: undefined;
  Details: { city: City; fromFavorites?: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colors } = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const renderHeaderRight = useCallback(
    (fromFavorites?: boolean) => (
      <FavoritesButton isFavorite={Boolean(fromFavorites)} onPress={() => {}} />
    ),
    [],
  );

  return (
    <ErrorBoundary navigator={navigator}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTransparent: true, title: '' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params.city.name,
            headerTitleStyle: {
              color: colors.primary,
              fontWeight: 'bold',
              alignSelf: 'center',
            },
            headerRight: () => renderHeaderRight(route.params.fromFavorites),
            headerTitleAlign: 'center',
            headerTintColor: colors.primary,
            headerBackButtonDisplayMode: 'minimal',
          })}
        />
      </Stack.Navigator>
    </ErrorBoundary>
  );
};

export default AppNavigator;
