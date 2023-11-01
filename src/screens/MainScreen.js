import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";



const data = [
  { id: 1, image: require('../../assets/staff.jpg'), description: 'STAFF' },
  { id: 2, image: require('../../assets/about.jpg'), description: 'ABOUT' },
  { id: 3, image: require('../../assets/serv.jpg'), description: 'SERVICES' },
  { id: 4, image: require('../../assets/product.jpg'), description: 'PRODUCTS' },
  { id: 5, image: require('../../assets/res.jpg'), description: 'RESERVATIONS' },
  { id: 6, image: require('../../assets/post.jpg'), description: 'POSTS' },
];

const MainScreen = () => {

  const navigation = useNavigation();

  const handleContinuePress = (option) => {
    setChosenOption(option);
    switch (option) {
      case 'STAFF':
        navigation.navigate('EmployeesScreen'); 
        break;
      case 'ABOUT':
        navigation.navigate('About'); 
        break;
        case 'RESERVATIONS':
        navigation.navigate('BookingScreen'); 
        break;
        case 'SERVICES':
        navigation.navigate('Services'); 
        break;
        case 'POSTS':
        navigation.navigate('PostsScreen'); 
        break;
        case 'PRODUCTS':
        navigation.navigate('ProductsScreens'); 
        break;
      default:
        break;
    }
  };
  


  const [chosenOption, setChosenOption] = useState(null);

  const handleChooseOption = (option) => {
    setChosenOption(option);
  };

  const groupedData = [];
  for (let i = 0; i < data.length; i += 2) {
    groupedData.push(data.slice(i, i + 2));
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#856c8b'
  },
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
    height: '25%',
  },
  itemContainer: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 8, 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainScreen;
