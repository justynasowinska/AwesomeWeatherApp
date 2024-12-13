import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ErrorMessage;
