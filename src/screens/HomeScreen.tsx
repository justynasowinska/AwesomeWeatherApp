import SearchInput from 'components/SearchInput';
import useSearchCities, { Status } from 'hooks/useSearchCities';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const { data, status, error } = useSearchCities(searchText);

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
          isLoading={status === Status.FETCHING}
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
