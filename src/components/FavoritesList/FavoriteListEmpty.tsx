import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const FavoriteListEmpty = () => {
  return (
    <View style={styles.emptyMessage}>
      <Text variant="titleLarge">No favorite cities yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyMessage: {
    padding: 16,
    alignItems: 'center',
  },
});

export default FavoriteListEmpty;
