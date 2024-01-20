import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Employee from "../screens/Employee.js";
import WhatsApp from "../Common/WhatsApp.js";
import Color from "../Common/Color.js";
import MainScreen from "../screens/MainScreen.js";
import Offers from "../screens/Offers.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MainScreen2 = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const { id: userId, name: userName } = useSelector(
    (state) => state.user.userData
  );
  const { id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );

  return (
    <View style={styles.container}>
      <WhatsApp />

      <View style={styles.container1}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Ionicons name="menu" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.textHeader}>
          {t("hello")} {userName}
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/pic3.jpg")}
          />
        </Text>
        <Text style={styles.textHeader1}>
          {t("welcome to")} {salonName} center
        </Text>
        <MainScreen />
        <Employee />
        <Offers />
      </ScrollView>
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </View>
  );
};

export default MainScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container1: {
    flexDirection: "row",
    paddingTop: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  iconStyle: {
    marginBottom: 1,
    alignSelf: "center",
    fontSize: 40,
    paddingTop: 40,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: 15,
  },
  textHeader1: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize",
    marginLeft: 15,
    color: Color.primary,
    marginBottom: 30,
  },
});
