import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Header from "../screens/Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";

const NotificationScreen = () => {
  const [t] = useTranslation();
  const { role } = useSelector((state) => state.user.userData);
  

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    id: userId,
    name: userName,
    email: userEmail,
  } = useSelector((state) => state.user.userData);

  const { id: salonIdUser } = useSelector(
    (state) => state.user.usedSalonData
  );
  
const { salonId:salonIdManager } = useSelector((state) => state.user.userData);

  console.log(salonIdUser);
  const baseUrl = "https://ayabeautyn.onrender.com";

  const fetchData = async () => { 
    try {
      const response = await fetch(
        `${baseUrl}/auth/${salonIdUser}/${userId}/Notification/userNotification`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch notifications: ${response.statusText}`
        );
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
    const fetchSalonData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/salons/${salonIdManager}/Notification/managerNotification`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch notifications: ${response.statusText}`
          );
        }
        const data = await response.json();
        setItems(data); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
        setIsLoading(false);
      }
    };

    if (role === "User") {
      fetchData();
    } else if (role === "Manager") { 
      fetchSalonData();
    }
  }, );

  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = now - postDate;

    if (timeDifference < 60000) {
      return t("Just Now");
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days <= 2) {
      return `${days}d ago`;
    } else {
      return postDate.toLocaleDateString("en-GB");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `${baseUrl}/notifications/notification/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Reuse the fetchData function
        fetchData();
      } else {
        const responseData = await response.json();
        console.error("Failed to delete item. Server response:", responseData);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={[styles.styleText]}>{t("Notification")}</Text>
      </View>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <SwipeListView
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.notificationContainer}>
              <View style={styles.userContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.notificationContent}>{item.body}</Text>
                <Text style={styles.postDate}>
                  {calculateTimeDifference(item.createdAt) ||
                    "No date available"}
                </Text>
              </View>
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => handleDelete(item._id)}
              >
                <Ionicons name="trash-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75} // Width of the delete button
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
  rowBack: {
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Change the background color as needed
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "#f0f0f0", // Change the background color as needed
    right: 0,
  },
  postDate: {
    fontSize: 12,
    color: "#555555",
    marginTop: 5,
    marginLeft: 300,
  },
});

export default NotificationScreen;
