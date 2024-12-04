import React from 'react';
import { TextInput } from 'react-native-paper';

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
}

const SearchInput = ({ value, onChange, onClear }: SearchInputProps) => {
  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={onChange}
      placeholder="Search for a city"
      maxLength={50}
      left={<TextInput.Icon icon="magnify" />}
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
