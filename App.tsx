import { NavigationContainer, Theme } from '@react-navigation/native';
import OfflineBanner from 'components/OfflineBanner/OfflineBanner';
import { FavoritesProvider } from 'context/FavoritesContext';
import React from 'react';
import { useColorScheme } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  darkTheme,
  darkThemeForNavigation,
  lightTheme,
  lightThemeForNavigation,
} from 'theme/paperTheme';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const colorScheme = useColorScheme();

  const navigationTheme: Theme =
    colorScheme === 'dark' ? darkThemeForNavigation : lightThemeForNavigation;
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer
          onReady={() => BootSplash.hide()}
          theme={navigationTheme}>
          <FavoritesProvider>
            <OfflineBanner />
            <AppNavigator />
          </FavoritesProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
