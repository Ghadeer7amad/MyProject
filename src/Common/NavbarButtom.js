import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Color from "../Common/Color";

const NavbarButtom = ({ onChange }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName); 
    onChange(iconName);
  };

  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleHomePress = () => {
    navigation.navigate("MainScreen2");
  };

  const handlefavPress = () => {
    navigation.navigate("Favorite");
  };

  const handlenotificationsPress = () => {
    navigation.navigate("Notifications");
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            handleHomePress();
            handleIconPress("home");
          }}
        >
          {selectedIcon === "home" ? (
            <Ionicons
              name="home"
              style={[
                styles.iconStyle,
                {
                  color: Color.background,
                  textShadowColor: Color.background,
                  borderBottomWidth: 3,
                  borderBottomColor: Color.background,
                },
              ]}
            />
          ) : (
            <Ionicons name="home-outline" style={styles.iconStyle} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handlenotificationsPress();
            handleIconPress("notifications");
          }}
        >
          {selectedIcon === "notifications" ? (
            <Ionicons
              name="notifications"
              style={[
                styles.iconStyle,
                {
                  color: Color.background,
                  textShadowColor: Color.background,
                  borderBottomWidth: 3,
                  borderBottomColor: Color.background,
                },
              ]}
            />
          ) : (
            <Ionicons name="notifications-outline" style={styles.iconStyle} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handlefavPress();
            handleIconPress("favorite");
          }}
        >
          {selectedIcon === "favorite" ? (
            <MaterialIcons
              name="favorite"
              style={[
                styles.iconStyle,
                {
                  color: Color.background,
                  textShadowColor: Color.background,
                  borderBottomWidth: 3,
                  borderBottomColor: Color.background,
                },
              ]}
            />
          ) : (
            <MaterialIcons name="favorite-outline" style={styles.iconStyle} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleSettingsPress();
            handleIconPress("settings");
          }}
        >
          {selectedIcon === "settings" ? (
            <Ionicons
              name="settings"
              style={[
                styles.iconStyle,
                {
                  color: Color.background,
                  textShadowColor: Color.background,
                  borderBottomWidth: 3,
                  borderBottomColor: Color.background,
                },
              ]}
            />
          ) : (
            <Ionicons name="settings-outline" style={styles.iconStyle} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavbarButtom;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Color.secondary,
    height: 65,
    marginBottom: 15,
    marginHorizontal: 10,
    borderTopColor: "#000",
    elevation: 5,
  },
  iconStyle: {
    color: "gray",
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 30,
    padding: 5,
  },
});
