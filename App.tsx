import { NavigationContainer, Theme } from '@react-navigation/native';
import OfflineBanner from 'components/OfflineBanner/OfflineBanner';
import { FavoritesProvider } from 'context/FavoritesContext';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      <NavigationContainer
        onReady={() => BootSplash.hide()}
        theme={navigationTheme}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <FavoritesProvider>
          <SafeAreaView
            style={styles.safeArea}
            edges={['top', 'left', 'right']}>
            <OfflineBanner />
            <AppNavigator />
          </SafeAreaView>
        </FavoritesProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
