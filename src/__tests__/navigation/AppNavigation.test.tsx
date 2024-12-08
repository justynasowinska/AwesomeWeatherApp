import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigation/AppNavigator';

describe('AppNavigator', () => {
  it('renders Home screen as the initial route', async () => {
    render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    expect(await screen.findByPlaceholderText('Search for a city')).toBeOnTheScreen();
  });
});
