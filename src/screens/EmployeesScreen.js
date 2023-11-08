import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import Header from './Header.js';
import NavbarButtom from '../Common/NavbarButtom';
import Icon from "react-native-vector-icons/Ionicons";
import Color from "../Common/Color";

const employeesData = [
  {
    id: '1',
    name: 'Aya',
    job: 'The Owner',
    photo: require('../../assets/employee.jpg'), // Replace with the actual photo path
  },
  {
    id: '2',
    name: 'Maymona',
    job: 'Software Engineer',
    photo:  require('../../assets/employee.jpg'), // Replace with the actual photo path
  },
  {
    id: '3',
    name: 'Ghadeer',
    job: 'Software Engineer',
    photo:  require('../../assets/employee.jpg'), // Replace with the actual photo path
  },
  {
    id: '4',
    name: 'Nada',
    job: 'Software Engineer',
    photo:  require('../../assets/employee.jpg'), // Replace with the actual photo path
  },
  // Add more employee data as needed
];

const EmployeesScreen = () => {
  


  return (
    <View style={styles.container}>
    <Header/>
    <CustomSearchBar/>

    <FlatList
    data={employeesData}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.employeeContainer}>
        <Image source={item.photo} style={styles.userImage} />
        <View style={styles.userContainer}>
          
          <View style={styles.employeeHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          </View>
        <Text style={styles.employeeContent}>{item.job}</Text> 
          
          <TouchableOpacity style={styles.employeeInteractions}>
            <Icon name="heart" size={30} color="#ff4d4d" />
            <Text style={styles.heart}>5</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    )}
  />
  <NavbarButtom/>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  employeeContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 10,
    marginBottom:5,
    borderRadius: 20,
    shadowColor:"#fff",
    flexDirection:"row",
    gap:10
    
  },
  userContainer: {
    flexDirection: "column",
    marginTop:10,
    
  },
  userImage: {
    width: 180,
    height: 180,
  },
  userName: {
    fontSize: 23,
    fontWeight: "bold",
    
  },
  employeeContent: {
    fontSize: 18,
    marginTop: 15,
    marginBottom:15
  },
  employeeInteractions:{
    marginTop:12,
    flexDirection:"row",
    gap:2
  },
  heart:{
    fontSize:20,
  }



});

export default EmployeesScreen;
