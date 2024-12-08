import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

const OfflineBanner = () => {
  const { isConnected } = useNetInfo();

  if (isConnected === null || isConnected) {
    return null;
  }

  return (
    <View
      style={styles.banner}
      accessibilityLabel="Offline. Some features may not be available.">
      <Icon source="wifi-off" size={20} color="white" />
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    top: 0,
    width: '100%',
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  text: {
    marginLeft: 12,
    color: 'white',
    fontWeight: '600',
  },
});

export default OfflineBanner;
