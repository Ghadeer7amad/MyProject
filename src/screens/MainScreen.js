import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import Color from '../Common/Color.js';
import { useTranslation } from 'react-i18next';





const MainScreen = () => {

  const navigation = useNavigation();
  const [t, i18n] = useTranslation();

  const handleContinuePress = (option) => {
    setChosenOption(option);
    switch (option) {
      case t('STAFF'):
        navigation.navigate('EmployeesScreen'); 
        break;
      case t('ABOUT'):
        navigation.navigate('About'); 
        break;
        case t('RESERVATIONS'):
        navigation.navigate('BookingScreen'); 
        break;
        case t('SERVICES'):
        navigation.navigate('ServicesScreen'); 
        break;
        case t('POSTS'):
        navigation.navigate('PostsScreen'); 
        break;
        case t('PRODUCTS'):
        navigation.navigate('ProductsScreens'); 
        break;
      default:
        break;
    }
  };

  const data = [
    { id: 1, image: require('../../assets/staff.jpg'), description: t('STAFF') },
    { id: 2, image: require('../../assets/about.jpg'), description: t('ABOUT') },
    { id: 3, image: require('../../assets/serv.jpg'), description: t('SERVICES') },
    { id: 4, image: require('../../assets/product.jpg'), description: t('PRODUCTS') },
    { id: 5, image: require('../../assets/res.jpg'), description: t('RESERVATIONS') },
    { id: 6, image: require('../../assets/post.jpg'), description: t('POSTS') },
  ];
  


  const [chosenOption, setChosenOption] = useState(null);

  const handleChooseOption = (option) => {
    setChosenOption(option);
  };

  const groupedData = [];
  for (let i = 0; i < data.length; i += 6) {
    groupedData.push(data.slice(i, i + 6));
  }

  return (
    <View style={styles.container}>
      {groupedData.map((group, index) => (
        <View key={index} style={styles.groupContainer}>
          {group.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity onPress={() => handleContinuePress(item.description)}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.image} />
                </View>
                <Text style={styles.description}>{item.description}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 2
  },
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 8,
    }
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MainScreen;
