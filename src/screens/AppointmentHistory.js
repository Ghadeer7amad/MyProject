import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import { Picker } from "@react-native-picker/picker";
import Header from "../screens/Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Select } from "native-base";

const AppointmentsScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortType, setSortType] = useState("closest"); // or "furthest"
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"

  const handleSearch = (searchText) => {
    const filteredData = items.filter((item) =>
      item.user_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filteredData);
  };

  const handleHomePress = (item) => {
    navigation.navigate("MainScreen2", { item });
  };

  const handleSortChange = (type) => {
    setSortType(type);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDetailsPress = (item) => {
    navigation.navigate("UserDetails", { item });
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to cancle this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: () => handleCancleAppointment(itemId),
        },
      ],
      { cancelable: false }
    );
  };
  const baseUrl = "https://ayabeautyn.onrender.com";

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/appointments/appointment`);
      const data = await response.json();

      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.appointment_date);
        const dateB = new Date(b.appointment_date);

        if (sortOrder === "asc") {
          return sortType === "closest" ? dateA - dateB : dateB - dateA;
        } else {
          return sortType === "closest" ? dateB - dateA : dateA - dateB;
        }
      });

      setItems(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleCancleAppointment = async (itemId) => {
    console.log("Deleting item with ID:", itemId);

    try {
      const response = await fetch(
        `${baseUrl}/appointments/appointment/${itemId}`,
        {
          method: "DELETE",
        }
      );

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
  }, [sortType, sortOrder]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={[styles.styleText, styles.styleText2]}>
          Appointment History.
        </Text>
        <CustomSearchBar
          placeholder={"Search Customer"}
          onSearch={handleSearch}
        />
      </View>
      <View
        style={{
          width: "40%",
          marginLeft: 15,
          borderWidth: 1,
          borderColor: Color.primary,
        }}
      >
        <Select
          placeholder="Select Service"
          style={{ width: 10, fontSize: 18 }}
          color={Color.primary}
          selectedValue={sortType}
          onValueChange={(value) => handleSortChange(value)}
        >
          {[
            { id: 1, name: "closest" },
            { id: 2, name: "furthest" },
          ].map((item) => (
            <Select.Item
              key={item.id}
              label={item?.name}
              placeholder={item?.name}
              value={item.name}
            />
          ))}
        </Select>
      </View>

      <FlatList
        data={filteredItems.length > 0 ? filteredItems : items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.appointmentContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{item.user_name}</Text>
              <Text style={styles.appointmentContent}>
                Branch: {item.branch}
              </Text>
              <Text style={styles.appointmentContent}>
                Date: {item.appointment_date}
              </Text>
              <Text style={styles.appointmentContent}>
                Time: {item.appointment_time}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.appointmentContent}>
                  Service: {item.serviceType}
                </Text>
                <TouchableOpacity
                  style={styles.styleIcons}
                  onPress={() => handleDetailsPress(item)}
                >
                  <Text style={styles.details}>User Details</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => confirmDelete(item._id)}
            >
              <Ionicons name="close" color="red" size={Spacing * 1.5} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleHomePress}>
        <Text style={styles.buttonStyle}>Home</Text>
      </TouchableOpacity>

      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  appointmentContainer: {
    backgroundColor: "#ffffff",
    margin: 15,
    marginBottom: 2,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.primary,
    position: "relative",
  },
  userContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555555",
  },
  appointmentContent: {
    fontSize: 17,
    color: "#848482",
    fontWeight: "bold",
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
  buttonStyle: {
    width: "35%",
    padding: 10,
    marginHorizontal: 250,
    fontWeight: "400",
    fontSize: 18,
    letterSpacing: 2,
    textAlign: "center",
    color: Color.secondary,
    backgroundColor: Color.primary,
    alignSelf: "center",
    marginTop: 15,
  },
  deleteIcon: {
    marginTop: -80,
  },
  removeButton: {
    position: "absolute",
    top: Spacing / 2,
    left: Spacing * 22,
    padding: Spacing / 2,
    zIndex: 1,
  },
  styleIcons: {
    backgroundColor: Color.primary,
    padding: Spacing / 2,
    borderRadius: Spacing,
    marginTop: -8,
  },
  details: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "400",
    padding: 4,
  },
});

export default AppointmentsScreen;
