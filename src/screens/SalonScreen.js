import React , { useState} from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { FontAwesome as Icon } from '@expo/vector-icons';
import CustomSearchBar from "../Common/SearchBarComponent.js";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from "../Common/Color";


const SalonScreen = () => {
  const data = [
    {
      id: '1',
      name: 'Aya Beauty',
      image: require('../../assets/aya5.jpg'),
    },
    {
      id: '2',
      name: 'Beauty Center 2',
      image: require('../../assets/aya5.jpg'),
    },
    {
      id: '3',
      name: 'Beauty Center 3',
      image: require('../../assets/aya5.jpg'),
    },
  ];



  const navigation = useNavigation();

  const handleContinuePress = (option) => {
    setChosenOption(option);
    switch (option) {
      case 'Aya Beauty':
        navigation.navigate('Chose'); 
        break;
      case 'Beauty Center 2':
        navigation.navigate('Chose'); 
        break;
        case 'Beauty Center 3':
        navigation.navigate('Chose'); 
        break;
      default:
        break;
    }
  };

  
  const [chosenOption, setChosenOption] = useState(null);

  const handleChooseOption = (option) => {
    setChosenOption(option);
  };

  return (
    <View style={styles.container}>
      <CustomSearchBar placeholder="Search your BeautyCenter" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            <TouchableOpacity onPress={() => handleContinuePress(item.name)}>
            <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
            <Image source={item.image} style={styles.cardImage} />
            </TouchableOpacity >
            <View style={styles.iconContainer}>
              <View style={styles.starContainer}>
                <Icon name="star" color="gold" size={25} />
                <Icon name="star" color="gold" size={25} />
                <Icon name="star-o" color="gold" size={25} />
                <Icon name="star-o" color="gold" size={25} />
              </View>
              <Icon name="heart-o" color="red" size={25} />
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  cardTitle: {
    color: 'gray',
    fontSize: 20,
    marginBottom: 10,
    
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
});

export default SalonScreen;
