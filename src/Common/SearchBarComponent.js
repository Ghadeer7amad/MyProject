import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const CustomSearchBar = ({ placeholder }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <SearchBar
      placeholder={placeholder || 'Search for your product you need'}
      onChangeText={handleSearch} 
      value={searchText} 
      containerStyle={styles.searchBarContainer}
      inputContainerStyle={styles.searchBarInputContainer}
      inputStyle={styles.searchBarInput}
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 10,
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  searchBarInput: {
    backgroundColor: "#fff",
  },
});

export default CustomSearchBar;