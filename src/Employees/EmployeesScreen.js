import React from "react";
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
import Header from "../screens/Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";
import { Ionicons } from "@expo/vector-icons";
import SearchProANDSer from "../Common/SerachProANDSer.js";
import { useNavigation } from "@react-navigation/native";
import Employees from "./EmployeesData.js";




const EmployeesScreen = () => {
  const navigation = useNavigation();

  const handleDetailsPress = (item) => {
    navigation.navigate("EmployeesDetails", { item });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={[styles.styleText, styles.styleText2]}>
          Beauty Employees.
        </Text>
        <CustomSearchBar placeholder={"search Employee"} />
      </View>

      <FlatList
        data={Employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.employeeContainer}>
            <View style={styles.ImageContainer}>
              <Image source={item.image} style={styles.userImage} />
            </View>
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.employeeContent}>{item.job}</Text>
              <TouchableOpacity style={styles.employeeInteractions}>
                <View style={styles.starContainer}>
                  <Icon name="star" color="gold" size={20} />
                  <Text style={styles.employeeContent}>4.5</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDetailsPress(item)} 
            >
              <Ionicons name="ios-arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  container2: {
  },
  employeeContainer: {
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 15,
    marginBottom: 20,
    flexDirection: "row",
    gap: 20,
  },
  userContainer: {
    flexDirection: "column",
    gap: 3,
    justifyContent: "center",
  },
  ImageContainer: {
    elevation: 10,
    borderRadius: 25,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 25
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  employeeContent: {
    fontSize: 15,

  },
  styleText: {
    color: Color.primary,
    fontSize: Spacing * 2,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: -15,
  },
  starContainer: {
    flexDirection: "row",
    gap: 3,
    marginTop:10,
  },
  button: {
    backgroundColor: "#caabd8",
    padding: 5,
    borderRadius: 50,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent:"center",
  },
});

export default EmployeesScreen;
