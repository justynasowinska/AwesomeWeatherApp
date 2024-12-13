import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const FavoriteListLoading = () => {
  return (
    <View style={styles.emptyMessage}>
      <Text style={styles.loadingMessage} variant="titleLarge">
        Loading Your Favorites...
      </Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyMessage: {
    padding: 16,
    alignItems: 'center',
  },
  loadingMessage: {
    marginBottom: 16,
  },
});

export default FavoriteListLoading;
