import { Component } from 'react';

import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native-paper';

import { RootStackParamList } from 'navigation/AppNavigator';

import { ErrorBoundary } from 'components/ErrorBoundary';

class TestComponent extends Component {
  componentDidMount(): void {
    throw new Error('Test error');
  }

  render() {
    return null;
  }
}

describe('ErrorBoundary', () => {
  it('renders without error', () => {
    render(
      <ErrorBoundary
        navigator={
          { canGoBack: () => false } as NavigationProp<RootStackParamList>
        }>
        <Text>Test content</Text>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Test content')).toBeOnTheScreen();
  });

  it('renders with error and default fallback UI', () => {
    render(
      <ErrorBoundary
        navigator={
          { canGoBack: () => false } as NavigationProp<RootStackParamList>
        }>
        <TestComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Ups! Something went wrong')).toBeOnTheScreen();
  });

  it('renders with error and custom fallback UI', () => {
    const CustomFallback = (error?: Error) => (
      <Text>{`Custom fallback: ${error?.message}`}</Text>
    );

    render(
      <ErrorBoundary
        fallback={CustomFallback}
        navigator={
          { canGoBack: () => false } as NavigationProp<RootStackParamList>
        }>
        <TestComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Custom fallback: Test error')).toBeOnTheScreen();
  });

  it('renders go back button if navigator can go back', () => {
    render(
      <NavigationContainer>
        <ErrorBoundary
          navigator={
            {
              canGoBack: () => true,
              goBack: () => {},
            } as NavigationProp<RootStackParamList>
          }>
          <TestComponent />
        </ErrorBoundary>
      </NavigationContainer>,
    );
    const goBackButton = screen.getByText('Go back');
    expect(goBackButton).toBeOnTheScreen();
    fireEvent.press(goBackButton);
    expect(goBackButton).toBeOnTheScreen();
  });
});
