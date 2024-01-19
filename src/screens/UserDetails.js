import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../screens/Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library you are using
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

const UserDetails = ({ route }) => {
  const user = route.params.item;
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user.user_id);

  const handleBackPress = () => {
    navigation.navigate("AppointmentHistory");
  };

  const [Info, setInfo] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (user.user_id) {
          const response = await fetch(
            `${baseUrl}/appointments/appointment/${user.user_id}/info`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Data received:", data);

          if (data) {
            setInfo(data);
          } else {
            console.error("Invalid data structure:", data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, [user.user_id]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (user.user_id) {
          const response = await fetch(
            `${baseUrl}/problems/problem/${user.user_id}/status`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Dataaa received:", data);

          if (data) {
            setStatus(data);
          } else {
            console.error("Invalid data structure:", data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [user.user_id]);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        <View style={styles.container2}>
          <Text style={[styles.styleText]}>User Details.</Text>
          <View style={styles.userContainer}>
            <View style={{ display: "flex", gap: 15, flexDirection: "row" }}>
              <Icon name="user" size={25} color="#555555" />
              <Text style={styles.userInfo}>Name: {Info.userName}</Text>
            </View>
            <View style={{ display: "flex", gap: 15, flexDirection: "row" }}>
              <Icon name="map-marker" size={25} color="#555555" />
              <Text style={styles.userInfo}>Address: {Info.address}</Text>
            </View>
            <View style={{ display: "flex", gap: 15, flexDirection: "row" }}>
              <Icon name="birthday-cake" size={22} color="#555555" />
              <Text style={styles.userInfo}>Age: {Info.age}</Text>
            </View>
            <View style={{ display: "flex", gap: 15, flexDirection: "row" }}>
              <Icon name="phone" size={25} color="#555555" />
              <Text style={styles.userInfo}>Phone Number: {Info.phone}</Text>
            </View>
            <View style={{ display: "flex", gap: 15, flexDirection: "row" }}>
              <Icon name="user-circle" size={25} color="#555555" />
              <Text style={styles.userInfo}>User Status: {status}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleBackPress}>
            <Text style={styles.buttonStyle}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  scrollView: {
    flex: 1,
  },
  userContainer: {
    backgroundColor: "#ffffff",
    margin: 15,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: Color.primary,
    position: "relative",
    marginTop: 50,
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  userInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#555555",
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
  icon: {
    marginRight: 5,
  },
});

export default UserDetails;
