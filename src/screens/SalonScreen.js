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
      Discrption: "Jerusalem | Hebron | Rahat"
    },
    {
      id: '2',
      name: 'Madleen Beauty',
      image: require('../../assets/aya5.jpg'),
      Discrption: "Jenin | Tulkarm"
    },
    {
      id: '3',
      name: 'Aram Beauty',
      image: require('../../assets/aya5.jpg'),
      Discrption: "Tulkarm | Nablus"
    },
  ];



  const navigation = useNavigation();

  const handleContinuePress = (option) => {
    setChosenOption(option);
    switch (option) {
      case 'Aya Beauty':
        navigation.navigate('MainScreen2'); 
        break;
      case 'Beauty Center 2':
        navigation.navigate('MainScreen2'); 
        break;
        case 'Beauty Center 3':
        navigation.navigate('MainScreen2'); 
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
                <Icon name="star" color="gold" size={20} />
                <Icon name="star" color="gold" size={20} />
                <Icon name="star-o" color="gold" size={20} />
                <Icon name="star-o" color="gold" size={20} />
              </View>
              <Icon name="heart-o" color="#cc0e74" size={20} />
            </View>
            <Text style={{marginTop: 20, letterSpacing: 1, color:Color.primary, fontWeight: "bold"}}>{item.Discrption}</Text>
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
    height: 350,
    borderRadius: 30,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
  },
  cardTitle: {
    color: Color.primary,
    fontSize: 17,
    letterSpacing: 2,
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
