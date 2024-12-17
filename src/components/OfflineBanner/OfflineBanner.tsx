import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { Icon, Text, useTheme } from 'react-native-paper';

const OfflineBanner = () => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();

  if (isConnected === null || isConnected) {
    return null;
  }

  return (
    <View
      style={[styles.banner, { backgroundColor: colors.error }]}
      accessibilityLabel="Offline. Some features may not be available.">
      <Icon source="wifi-off" size={20} color={colors.onError} />
      <Text style={[styles.text, { color: colors.onError }]}>
        You are offline
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    top: 0,
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  text: {
    marginLeft: 12,
    fontWeight: '600',
  },
});

export default memo(OfflineBanner);
