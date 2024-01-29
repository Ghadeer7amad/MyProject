import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, View } from 'react-native';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Color from './Color.js';
import { useTranslation } from 'react-i18next';  


const SearchProANDSer = ({ placeholder, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [t, i18n] = useTranslation();


  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text); 
  };

  return (
    <View style={styles.searchBarContainer}>
      <SearchBar
        placeholder={placeholder || t('Search for your product')}
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
      />
      <View style={styles.icon}>
        <FontAwesomeIcon icon={faList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 10,
    marginTop: 20,
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 4,
  },
  searchBarInput: {
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    backgroundColor: '#caabd8',
    marginTop: 29,
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
    marginLeft: 330,
    padding: 20,
  },
});

export default SearchProANDSer;
