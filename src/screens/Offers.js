import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import React from 'react';
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome as Icon } from '@expo/vector-icons';
import Color from "../Common/Color.js";
import { useTranslation } from 'react-i18next'; 

const screenwidth = Dimensions.get("window").width;
const screenheight = Dimensions.get("window").height;

const images = [
    {price: '20%',image: require('../../assets/pro5.jpg')},
    {price: '20%', image: require('../../assets/pro3.jpg')},
    {price: '50%', image: require('../../assets/pro4.jpg')},
    {price: '10%', image: require('../../assets/pro2.jpg')},
    {price: '30%', image: require('../../assets/pro6.jpg')}
  ];

const Offers = () => {

  const [t, i18n] = useTranslation();


  return (
    <View style={{marginTop: 30}}>
    <View style={{justifyContent: 'space-between', flexDirection: "row",}}>
    <Text style={{textTransform: 'uppercase', fontSize: 20, marginVertical: 10, marginLeft: 10, fontWeight: 'bold'}}>{t('Best Offers')}</Text>
    <Text style={{textTransform: 'capitalize', fontSize: 15, marginVertical: 10, marginRight: 10}}>{t('See more')}
    <Ionicons name="arrow-forward" color='#f9b248' size={20}/></Text>
    </View>
    <ScrollView snapToInterval={screenwidth} decelerationRate='fast' alwaysBounceHorizontal={true} horizontal>
      {images.map((item, index) => (
        <View key={index} style={{marginBottom: 30, alignItems: 'center', width: screenwidth, height: screenheight-500, backgroundColor: '#986ead',
        marginHorizontal: 5}}>
          <Image source={item.image} style={{width: screenwidth, height: screenheight - 500, resizeMode: 'cover'}} />
          <Text style={styles.priceText}>{`$${item.price}`}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);
};


export default Offers

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row'
      },
      priceText: {
        position: 'absolute',
        top: 0, 
        right: 0,
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.background,
        backgroundColor: Color.secondary,
        borderBottomLeftRadius: 50,
        padding: 15
      },
})