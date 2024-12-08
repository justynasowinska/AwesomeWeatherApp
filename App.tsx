import { NavigationContainer } from '@react-navigation/native';
import OfflineBanner from 'components/OfflineBanner/OfflineBanner';
import { FavoritesProvider } from 'context/FavoritesContext';
import React from 'react';
import { StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide()}>
      <FavoritesProvider>
        <PaperProvider>
          <SafeAreaView
            style={styles.safeArea}
            edges={['top', 'left', 'right']}>
            <OfflineBanner />
            <AppNavigator />
          </SafeAreaView>
        </PaperProvider>
      </FavoritesProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
