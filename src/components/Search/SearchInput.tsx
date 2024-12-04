import React from 'react';
import { ActivityIndicator, TextInput } from 'react-native-paper';

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
  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={onChange}
      placeholder="Search for a city"
      maxLength={50}
      left={
        isLoading ? (
          <TextInput.Icon
            icon={ActivityIndicatorIcon}
            testID="icon-left-loading"
          />
        ) : (
          <TextInput.Icon icon="magnify" testID="icon-left-magnify" />
        )
      }
      right={
        value ? (
          <TextInput.Icon
            icon="close"
            onPress={onClear}
            forceTextInputFocus={false}
            testID="icon-right-close"
          />
        ) : null
      }
    />
  );
};

export default SearchInput;
