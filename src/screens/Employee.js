import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import React from 'react';
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome as Icon } from '@expo/vector-icons';
import Color from "../Common/Color.js";

const screenwidth = Dimensions.get("window").width;
const screenheight = Dimensions.get("window").height;

const Employee = () => {
  const data = [
    { id: 1, image: require('../../assets/n7.jpg'), Name: 'Nada Obaid', description: '6 years of experience' },
    { id: 2, image: require('../../assets/n3.jpg'), Name: 'Maymona Kanfer', description: '7 years of experience' },
    { id: 3, image: require('../../assets/n2.jpg'), Name: 'Gadeer Hamed', description: '4 years of experience' },
    { id: 4, image: require('../../assets/n4.jpg'), Name: 'Nada Obaid', description: '8 years of experience' },
    { id: 5, image: require('../../assets/n5.jpg'), Name: 'Nada Obaid', description: '3 years of experience' }
  ];

  return (
    <View style={{marginTop: 30}}>
      <View style={{justifyContent: 'space-between', flexDirection: "row",}}>
      <Text style={{textTransform: 'uppercase', fontSize: 20, marginVertical: 10, marginLeft: 10, fontWeight: 'bold'}}>Beauty Employee</Text>
      <Text style={{textTransform: 'capitalize', fontSize: 15, marginVertical: 10, marginRight: 10}}>See All
      <Ionicons name="arrow-forward" color='#f9b248' size={20}/></Text>
      </View>
      <ScrollView snapToInterval={screenwidth} decelerationRate='fast' alwaysBounceHorizontal={true} horizontal>
        {data.map((item, index) => (
          <View key={index} style={{ alignItems: 'center', width: screenwidth-180, height: screenheight-1000, borderRadius: 60, backgroundColor: '#986ead',
          marginHorizontal: 5}}>
            <Image source={item.image} style={{width: screenwidth-180, height: screenheight - 600, resizeMode: 'contain', borderTopLeftRadius: 60, borderTopRightRadius: 60 }} />
             <Text style={{color:'#fff', letterSpacing: 1.5, marginBottom: 3}}>{item.Name}</Text>
            <Text style={{color:  Color.secondary, marginBottom: 3}}>{item.description}</Text>
            <View style={styles.starContainer}>
                <Icon name="star" color="gold" size={15} />
                <Icon name="star" color="gold" size={15} />
                <Icon name="star-o" color="gold" size={15} />
                <Icon name="star-o" color="gold" size={15} />
              </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Employee;

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    marginBottom: 4
  },
});
