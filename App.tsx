import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from 'context/FavoritesContext';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </NavigationContainer>
  );
};

export default App;
