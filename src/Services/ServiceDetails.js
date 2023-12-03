import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Color from "../Common/Color.js";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome as Iconn } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const ServiceDetailsScreen = ({ route }) => {
  const { service } = route.params;
  const navigation = useNavigation();

  const [serviceDetails, setserviceDetails] = useState(null);

  const handleBookAppointment = () => {
    navigation.navigate("BookingScreen");
  };
  const handleCancelAppointment = () => {
    navigation.navigate("ServicesScreen");
  };
  const baseUrl = "https://ayabeautyn.onrender.com";
  useEffect(() => {
    console.log("Fetching services...");
    fetch(`${baseUrl}/services/getDetailsServices`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        setserviceDetails(data.serviceDetails);
        console.log(data)
      })
      .catch((error) => console.log('Error from favs screen: ', error.message));
  }, []);


  return (
    <View style={styles.container}>
      {serviceDetails ?(
        <>
          <Image source={{ uri: serviceDetails.image }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.name}>{serviceDetails.name}</Text>
              <View style={styles.starContainer}>
                <Iconn name="star" color="gold" size={15} />
                <Iconn name="star" color="gold" size={15} />
                <Iconn name="star" color="gold" size={15} />
                <Iconn name="star-o" color="gold" size={15} />
                <Iconn name="star-o" color="gold" size={15} />
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={styles.sectionTitleContainer}>
                <Icon name="ios-cash" color={Color.primary} size={20} />
                <Text style={styles.time}>{serviceDetails.price}</Text>
              </View>
              <View style={styles.sectionTitleContainer}>
                <Icon name="time" color={Color.primary} size={20} />
                <Text style={styles.time}>{serviceDetails.time}</Text>
              </View>
            </View>

            <Text style={{ fontSize: 23, color: "black", fontWeight: "bold", marginLeft: 20 }}>
              Description
            </Text>
            <Text style={styles.description}>{serviceDetails.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
                <Text style={styles.buttonText}>Book Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.button1]}
                onPress={handleCancelAppointment}
              >
                <Text style={styles.buttonText1}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  image: {
    width: "100%",
    height: '45%',
  },
  sectionTitleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position:'absolute',
    marginTop: 300,
    width: '100%'
  },
  name: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 20,
    color: "black",
    marginLeft: 20
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    marginLeft: 250,
    marginTop: 30
  },
  time: {
    fontSize: 15,
    color: 'gray',
    marginLeft:10,
    marginRight: 10
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    lineHeight: 30,
    color: 'gray',
    letterSpacing: 1,
    marginLeft: 20
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 70,
    marginLeft: 30,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20
  },
  button1: {
    paddingHorizontal: 10,
    marginLeft: 20,
    backgroundColor: Color.secondary,
    borderColor: Color.background,
    borderWidth: 1
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonText1: {
    color: Color.background,
  },
});

export default ServiceDetailsScreen;
