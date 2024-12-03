import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <TextInput
          mode="outlined"
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search for a city"
          maxLength={50}
          left={<TextInput.Icon icon="magnify" />}
          right={
            searchText ? (
              <TextInput.Icon
                icon="close"
                onPress={handleClear}
                forceTextInputFocus={false}
              />
            ) : null
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default HomeScreen;
