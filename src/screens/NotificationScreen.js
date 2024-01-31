import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../screens/Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const NotificationScreen = () => {
    const [t] = useTranslation();
  
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { userData, usedSalonData } = useSelector((state) => state.user);
    const { id: userId, name: userName } = userData;
    const { _id: salonId, name: salonName } = useSelector(
      (state) => state.user.usedSalonData
    );
  
    const baseUrl = "https://ayabeautyn.onrender.com";
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/notifications/notifications/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); 
  
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.container2}>
          <Text style={[styles.styleText]}>
            {t("Notification")}
          </Text>
        </View>
  
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.notificationContainer}>
                <View style={styles.userContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.notificationContent}>
                    {item.body}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
  
        <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  notificationContainer: {
    backgroundColor: "#ffffff",
    margin: 10,
    marginBottom: 2,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.primary,
    position: "relative",
  },
  userContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555555",
  },
  notificationContent: {
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
    marginBottom: 15,
  },
  styleIcons: {
    backgroundColor: Color.primary,
    padding: Spacing / 2,
    borderRadius: Spacing,
    marginTop: -8,
  },
  loadingText: {
    fontSize: 18,
    color: "#555555",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default NotificationScreen;
