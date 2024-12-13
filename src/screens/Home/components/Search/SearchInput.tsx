import { StyleSheet } from 'react-native';

import { ActivityIndicator, TextInput, useTheme } from 'react-native-paper';

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  isLoading: boolean;
  onClear: () => void;
}

const ActivityIndicatorIcon = () => <ActivityIndicator />;

const SearchInput = ({
  value,
  onChange,
  isLoading,
  onClear,
}: SearchInputProps) => {
  const { colors } = useTheme();

  return (
    <TextInput
      mode="flat"
      value={value}
      onChangeText={onChange}
      placeholder="Search for a city"
      underlineColor="transparent"
      activeUnderlineColor="transparent"
      selectionColor={colors.onSurface}
      cursorColor={colors.onSurface}
      style={[
        styles.input,
        { backgroundColor: colors.surface, color: colors.onSurface },
      ]}
      placeholderTextColor={colors.onSurfaceVariant}
      maxLength={50}
      autoCorrect={false}
      autoComplete="off"
      testID="search-input"
      left={
        isLoading ? (
          <TextInput.Icon
            icon={ActivityIndicatorIcon}
            testID="icon-left-loading"
            accessibilityLabel="Loading city search results"
          />
        ) : (
          <TextInput.Icon icon="magnify" testID="icon-left-magnify" />
        )
      }
      right={
        value ? (
          <TextInput.Icon
            icon="close-circle-outline"
            onPress={onClear}
            forceTextInputFocus={false}
            testID="icon-right-close"
            accessibilityLabel="Clear search input"
          />
        ) : null
      }
    />
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
