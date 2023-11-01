import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import CustomSearchBar from "../Common/SearchBarComponent.js";
import Header from './Header.js';
import NavbarButtom from '../Common/NavbarButtom';

const employeesData = [
  {
    id: '1',
    name: 'Aya',
    job: 'The Owner',
    photo: require('../../assets/aya5.jpg'), // Replace with the actual photo path
  },
  {
    id: '2',
    name: 'Maymona',
    job: 'Software Engineer',
    photo: require('../../assets/userimage.jpg'), // Replace with the actual photo path
  },
  {
    id: '3',
    name: 'Ghadeer',
    job: 'Software Engineer',
    photo: require('../../assets/userimage.jpg'), // Replace with the actual photo path
  },
  {
    id: '4',
    name: 'Nada',
    job: 'Software Engineer',
    photo: require('../../assets/userimage.jpg'), // Replace with the actual photo path
  },
  // Add more employee data as needed
];

const EmployeesScreen = () => {
  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Image source={item.photo} style={styles.employeePhoto} />
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.employeeJob}>{item.job}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <CustomSearchBar placeholder="Your Fav Employee" />
      <FlatList
        data={employeesData}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id}
      />
      <NavbarButtom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  employeePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  employeeJob: {
    fontSize: 16,
    color: '#777',
  },
});

export default EmployeesScreen;
