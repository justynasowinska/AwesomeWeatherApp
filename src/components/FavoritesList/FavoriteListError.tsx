import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface FavoriteListErrorProps {
  error: Error;
}

const FavoriteListError = ({ error }: FavoriteListErrorProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.emptyMessage}>
      <Text style={{ color: colors.error }} variant="titleLarge">
        {error.message || 'Failed to load your favorites.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyMessage: {
    padding: 16,
    alignItems: 'center',
  },
});

export default FavoriteListError;
