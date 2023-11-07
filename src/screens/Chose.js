import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Header from "./Header";
import NavbarButtom from '../Common/NavbarButtom';
import Settings from "../CommonNav/Settings";
import MainScreen from "./MainScreen";


const Stack = createStackNavigator();



const Chose = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); 
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
    
      <Header />
      <MainScreen />
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)}/>
      
    </View>
  );
};

export default Chose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#a45fbe',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  settingsButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

