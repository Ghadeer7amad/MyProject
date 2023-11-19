import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../Common/Color.js';
import SearchProANDSer from '../Common/SearchBarComponent.js';
import MainScreen from '../screens/MainScreen.js';
import Employee from '../screens/Employee.js';
import Offers from '../screens/Offers.js'
import NavbarButtom from '../Common/NavbarButtom.js'

const MainScreen2 = () => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Ionicons name="menu" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.textHeader}>
          hello, nada
          <Image style={{ width: 50, height: 50 }} source={require("../../assets/pic3.jpg")} />
        </Text>
        <Text style={styles.textHeader1}>welcome beauty center</Text>
        <SearchProANDSer placeholder={'search here'} />
        <MainScreen />
        <Employee />
        <Offers/>
        <NavbarButtom/>
      </ScrollView>
    </View>
  );
};

export default MainScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1: {
    flexDirection: 'row',
    paddingTop: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconStyle: {
    marginBottom: 1,
    alignSelf: 'center',
    fontSize: 40,
    paddingTop: 40,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 15,
  },
  textHeader1: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginLeft: 15,
    color: Color.primary,
  },
});