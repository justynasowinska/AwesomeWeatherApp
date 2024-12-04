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
          <TextInput.Icon icon={ActivityIndicatorIcon} />
        ) : (
          <TextInput.Icon icon="magnify" />
        )
      }
      right={
        value ? (
          <TextInput.Icon
            icon="close"
            onPress={onClear}
            forceTextInputFocus={false}
          />
        ) : null
      }
    />
  );
};

export default SearchInput;
