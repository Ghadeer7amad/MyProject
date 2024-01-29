import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const EmployeesDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [t] = useTranslation();

  const handleBookAppointment = () => {
    navigation.navigate("BookingScreen");
  };
  const handleCancelAppointment = () => {
    navigation.navigate("EmployeesScreen");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.image?.secure_url }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity
            style={styles.chat}
            onPress={() => handleDetailsPress(item)}
          >
            <Ionicons name="chatbubble" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.job}>{item.job}</Text>
        <View style={styles.iconContainer}>
          <View style={styles.starContainer}>
            <Icon name="star" color="gold" size={20} />
            <Text style={styles.rate}>4.5</Text>
          </View>
          <TouchableOpacity style={styles.starContainer}>
            <Icon name="checkmark-circle" size={20} color="green" />
            <Text style={styles.rate}>
              {item.experienceYears} {t("years of experience")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleBookAppointment}
          >
            <Text style={styles.buttonText}>{t("Book Now")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPress={handleCancelAppointment}
          >
            <Text style={styles.buttonText1}>{t("Cancel")}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: "60%",
    position: "absolute",
    marginTop: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: 5,
  },

  detailsContainer: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 600,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginLeft: 20,
  },
  job: {
    fontSize: 18,
    color: "black",
    margin: 20,
    marginTop: 0,
    paddingBottom: 15,
  },
  iconContainer: {
    flexDirection: "row",
  },
  starContainer: {
    flexDirection: "row",
    margin: 20,
    marginTop: 5,
    gap: 5,
  },
  rate: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 30,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 15,
    paddingHorizontal: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  button1: {
    paddingHorizontal: 10,
    marginLeft: 20,
    backgroundColor: Color.secondary,
    borderColor: Color.background,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonText1: {
    color: Color.background,
  },
  chat: {
    backgroundColor: Color.primary,
    padding: 10,
    borderRadius: 50,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 20,
  },
});

export default EmployeesDetailsScreen;
