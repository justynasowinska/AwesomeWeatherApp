import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { City } from 'types/openWeather';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: { city: City };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTransparent: true, title: '' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTintColor: colors.primary,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
