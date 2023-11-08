import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, View } from 'react-native';
import { faList} from '@fortawesome/free-solid-svg-icons'; 

const CustomSearchBar = ({ placeholder }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.searchBarContainer}>
      <SearchBar
        placeholder={placeholder || 'Search for your product'}
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
      />
      <View style={styles.icon}>
      <FontAwesomeIcon icon={faList}/>
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
    borderRadius: 50,
    padding: 3,
   
  },
  searchBarInput: {
    backgroundColor: "#fff",
  },
  icon: {
    position: 'absolute',
    backgroundColor:"#caabd8",
    marginTop: 29,
    borderBottomEndRadius: 50,
    borderTopEndRadius: 50,
    marginLeft: 350,
    padding: 19,
  }
});

export default CustomSearchBar;
