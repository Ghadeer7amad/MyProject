import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Spacing from "../Common/Spacing.js";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import { useNavigation } from "@react-navigation/native"; // استخدام useNavigation

const NavbarTop = () => {
  const navigation = useNavigation(); // الحصول على كائن الـ navigation

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.smallContainer}>
      <TouchableOpacity style={styles.styleIcon} onPress={handleMenuPress}>
        <BlurView style={styles.styleBlurView}>
          <Ionicons name="menu" size={Spacing * 2} color={Color.background} />
        </BlurView>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <BlurView style={{ height: "100%", padding: Spacing / 4 }}>
          <Image source={require("../../assets/aya5.jpg")} style={styles.imageStyle} />
        </BlurView>
      </View>
    </View>
  );
};

export default NavbarTop;

const styles = StyleSheet.create({
<<<<<<< HEAD
  smallContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styleIcon: {
    borderRadius: Spacing,
    overflow: "hidden",
    width: Spacing * 3,
    height: Spacing * 3,
    backgroundColor: Color.secondary,
  },
  styleBlurView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Spacing * 4,
    height: Spacing * 4,
    overflow: "hidden",
    borderRadius: Spacing * 2,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    borderRadius: Spacing * 2,
  },
});
=======
    smallConatiner:{
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    styleIcon:{
        borderRadius: Spacing,
        overflow: "hidden",
        width: Spacing * 3,
        height : Spacing * 3,
        backgroundColor : Color.secondary
    },
    styleBulrView:{
        height : "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer:{
        width: Spacing * 3.7,
        height : Spacing * 3.7,
        overflow: "hidden",
        borderRadius: Spacing*2
    },
    imageStyle:{
        height:"100%",
        width:"100%",
        borderRadius: Spacing * 2
    }
})
>>>>>>> 913910607cd6e47ac49d257586399dfd28761254
