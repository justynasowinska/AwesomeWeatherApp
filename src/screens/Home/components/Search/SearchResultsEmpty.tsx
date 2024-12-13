import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

const SearchResultsEmpty = () => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">
        No results yet. Keep typing or try something different.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
});

export default SearchResultsEmpty;
