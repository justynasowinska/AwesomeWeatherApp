import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';

import AppNavigator from 'navigation/AppNavigator';

import { FavoritesProvider } from 'context/FavoritesContext';

jest.mock('axios');

describe('AppNavigator', () => {
  const queryClient = new QueryClient();

  it('renders correctly', async () => {
    render(
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <FavoritesProvider>
            <AppNavigator />
          </FavoritesProvider>
        </QueryClientProvider>
      </NavigationContainer>,
    );

    expect(
      await screen.findByPlaceholderText('Search for a city'),
    ).toBeOnTheScreen();
  });
});
