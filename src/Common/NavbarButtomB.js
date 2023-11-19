import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Color from '../Common/Color';


const NavbarButtom = ({onChange}) => {
    const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
    onChange(iconName);
  };

    const navigation = useNavigation();

    const handleSettingsPress = () => {
        navigation.navigate('Settings');
      };

    const handleHomePress = () => {
        navigation.navigate('Chose');
      };


    return (
    <View >
        <View style = {styles.container}>
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
                { color: 'white', textShadowColor: Color.secondary , borderBottomWidth: 3,  borderBottomColor: Color.secondary   },
              ]}
            />
          ) : (
            <Ionicons
              name="home-outline"
              style={styles.iconStyle}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleIconPress("notifications");
          }}
        >
          {selectedIcon === "notifications" ? (
            <Ionicons
              name="notifications"
              style={[
                styles.iconStyle,
                { color: 'white',  textShadowColor:Color.secondary ,borderBottomWidth: 3,  borderBottomColor: Color.secondary },
              ]}
            />
          ) : (
            <Ionicons
              name="notifications-outline"
              style={styles.iconStyle}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleIconPress("favorite");
          }}
        >
          {selectedIcon === "favorite" ? (
            <MaterialIcons
              name="favorite"
              style={[
                styles.iconStyle,
                { color: 'white', textShadowColor: Color.secondary ,borderBottomWidth: 3,  borderBottomColor: Color.secondary },
              ]}
            />
          ) : (
            <MaterialIcons
              name="favorite-outline"
              style={styles.iconStyle}
            />
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
                { color: 'white', textShadowColor: Color.secondary ,borderBottomWidth: 3,  borderBottomColor: Color.secondary },
              ]}
            />
          ) : (
            <Ionicons
              name="settings-outline"
              style={styles.iconStyle}
            />
          )}
        </TouchableOpacity>
        </View>
        </View>
        
        
    )
}

export default NavbarButtom;

const styles = StyleSheet.create({

    container: {   
    flexDirection: "row",
    padding: 10,
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Color.background,
    height: 65,
    marginBottom: 15,
    marginHorizontal: 10,
    borderTopColor:"#000",
    },
    iconStyle: {
        color: "#fff",
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25,
        padding: 5,
    },
});