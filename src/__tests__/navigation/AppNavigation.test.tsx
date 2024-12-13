import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';

import AppNavigator from 'navigation/AppNavigator';

import { FavoritesProvider } from 'context/FavoritesContext';

describe('AppNavigator', () => {
  it('renders Home screen as the initial route', async () => {
    render(
      <NavigationContainer>
        <FavoritesProvider>
          <AppNavigator />
        </FavoritesProvider>
      </NavigationContainer>,
    );

    expect(
      await screen.findByPlaceholderText('Search for a city'),
    ).toBeOnTheScreen();
  });
});
