import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavbarTop from "../Common/navbarTop.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Spacing from "../Common/Spacing.js";
import Color from "../Common/Color.js";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ServiceDetailsScreen = ({ route }) => {
  const { service } = route.params;
  const navigation = useNavigation();

  const handleBookAppointment = () => {
    navigation.navigate("BookingScreen");
  };
  const handleCancelAppointment = () => {
    navigation.navigate("ServicesScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: Spacing }}>
        <NavbarTop />

        <View style={styles.detailsContainer}>
          <Image source={service.image} style={styles.image} />
          <Text style={styles.name}>{service.name}</Text>

          <View style={styles.sectionTitleContainer}>
            <Icon name="ios-cash" color={Color.primary} size={25} /> 
            <Text style={styles.time}>{service.price}</Text>
          </View>
          <View style={styles.sectionTitleContainer}>
            <Icon name="time" color={Color.primary} size={25} />
            <Text style={styles.time}>{service.time}</Text>
          </View>

          <Text style={styles.description}>{service.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleBookAppointment}
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCancelAppointment}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavbarButtom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  image: {
    width: "100%",
    height: 250,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    borderBottomWidth: 3, // Add a bottom border
    borderBottomColor: "#d9b650", // Border color
    marginBottom: 20,
    marginTop: 20,
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    color: "#d9b650",
  },

  time: {
    fontSize: 20,
    marginLeft:5
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: Color.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default ServiceDetailsScreen;
