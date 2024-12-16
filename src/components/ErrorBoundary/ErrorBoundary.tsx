import { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';

import { RootStackParamList } from 'navigation/AppNavigator';

import Screen from 'components/Screen';

interface Props {
  children: ReactNode;
  navigator: NavigationProp<RootStackParamList>;
  fallback?: (error?: Error) => ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // TODO: log error to error tracking service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error);
      }

      return (
        <Screen>
          <View style={style.container}>
            <Text variant="headlineMedium">Ups! Something went wrong</Text>
            <Text variant="bodyLarge">
              There was an unexpected issue in the application. Our team has
              been notified and will get this fixed.
            </Text>
            {this.state.error ? (
              <Text variant="bodySmall">{this.state.error.toString()}</Text>
            ) : null}
            {this.props.navigator.canGoBack() ? (
              <Button
                onPress={() => this.props.navigator.goBack()}
                style={style.button}
                mode="contained">
                Go back
              </Button>
            ) : null}
          </View>
        </Screen>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: '50%',
  },
});
