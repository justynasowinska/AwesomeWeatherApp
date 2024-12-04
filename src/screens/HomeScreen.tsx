import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import SearchInput from 'components/SearchInput';

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
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          onClear={handleClear}
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
