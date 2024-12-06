import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from 'context/FavoritesContext';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide()}>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </NavigationContainer>
  );
};

export default App;
