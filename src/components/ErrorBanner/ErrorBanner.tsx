import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Banner,
  Text,
} from 'react-native-paper';

interface ErrorBannerProps {
  visible: boolean;
  error?: string | null;
  onClosePress: () => void;
}

const ErrorBanner = ({ visible, error, onClosePress }: ErrorBannerProps) => {
  return (
    <Banner
        visible={visible && Boolean(error)}
        icon="alert-circle-outline"
        actions={[
          {
            label: 'Close',
            onPress: onClosePress,
            accessibilityLabel: 'Close error message',
          },
        ]}
        style={styles.errorBanner}
      >
        <Text variant="bodyLarge">{error}</Text>
      </Banner>
  );
};

const styles = StyleSheet.create({
  errorBanner: {
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorBannerText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ErrorBanner;
