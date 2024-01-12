import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import Header from "../screens/Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const EmployeesScreen = () => {
  const navigation = useNavigation();
  const [t, i18n] = useTranslation();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (searchText) => {
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filteredData);
  };
  const { role } = useSelector((state) => state.user.userData);

  const handleDetailsPress = (item) => {
    navigation.navigate("EmployeesDetails", { item });
  };

  const handleEditEmployee = async (item) => {
    navigation.navigate("EditEmployee", { item });
  };

  const baseUrl = "https://ayabeautyn.onrender.com";

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/employees/employee`);
      const data = await response.json();
      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this employee?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: () => handleDeletePress(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeletePress = async (itemId) => {
    console.log("Deleting item with ID:", itemId);

    try {
      const response = await fetch(`${baseUrl}/employees/employee/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        const responseData = await response.json();
        console.error("Failed to delete item. Server response:", responseData);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={[styles.styleText, styles.styleText2]}>
          Beauty Employees.
        </Text>
        <CustomSearchBar
          placeholder="Search Employee"
          onSearch={handleSearch}
        />
      </View>
      {role === "Admin" && (
        <TouchableOpacity onPress={() => navigation.navigate("AddEmployee")}>
          <Text style={styles.buttonStyle}>Add Employee</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredItems.length > 0 ? filteredItems : items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.employeeContainer}>
            <View style={styles.ImageContainer}>
              <Image
                source={{ uri: item?.image?.secure_url }}
                style={styles.userImage}
              />
            </View>
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.employeeContent}>{item.job}</Text>
              <TouchableOpacity style={styles.employeeInteractions}>
                <View style={styles.starContainer}>
                  <Icon name="star" color="gold" size={20} />
                  <Text style={styles.employeeContent}>4.5</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDetailsPress(item)}
                  >
                    <Ionicons
                      name="ios-arrow-forward"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                  {role === "Admin" && (
                    <TouchableOpacity
                      style={styles.editIcon}
                      onPress={() => handleEditEmployee(item)}
                    >
                      <Icon name="pencil" color="#5e366a" size={20} />
                    </TouchableOpacity>
                  )}
                  {role === "Admin" && (
                    <TouchableOpacity
                      style={styles.deleteIcon}
                      onPress={() => confirmDelete(item._id)}
                    >
                      <Icon name="close" color="#5e366a" size={20} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            </View>
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
  container2: {},
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
    borderRadius: 25,
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
    marginTop: 10,
  },
  button: {
    backgroundColor: "#caabd8",
    padding: 5,
    borderRadius: 50,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 100,
  },
  buttonStyle: {
    width: "35%",
    padding: 10,
    marginHorizontal: 250,
    fontWeight: "400",
    fontSize: 15,
    letterSpacing: 2,
    textAlign: "center",
    color: Color.primary,
    borderWidth: 1,
    borderColor: Color.primary,
  },
  deleteIcon: {
    marginTop: -80,
    marginLeft: 10,
  },
  editIcon: {
    marginTop: -80,

    marginLeft: -20,
  },
});

export default EmployeesScreen;
