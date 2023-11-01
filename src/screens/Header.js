import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import One from '../../assets/aya.jpeg';

const Drawer = createDrawerNavigator();

const Header = () => {
  const navigation = useNavigation();

  const handleMenuPress   = () => {
    navigation.openDrawer();
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress}>
        <Ionicons name="menu" style={styles.iconStyle} />
      </TouchableOpacity>

      <View style={styles.headerContent}>
        <Image source={One} style={styles.imageContainer} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.300)',
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 7,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconStyle: {
    color: '#5e366a',
    marginBottom: 1,
    alignSelf: 'center',
    fontSize: 40,
    paddingTop: 30,
  },

  imageContainer: {
    width: 50,
    height: 70,
    overflow: 'hidden',
    borderRadius: 20,
    marginRight: 10,
    marginTop: 35,
  },
});
