import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';

interface SearchResultsErrorProps {
  error: Error;
}

const SearchResultsError = ({ error }: SearchResultsErrorProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={{ color: colors.error }}>
        Error: {error.message || 'An error occurred'}
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

export default SearchResultsError;
