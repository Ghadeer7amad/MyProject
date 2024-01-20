import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ToastAndroid,
  } from "react-native";
  import { Button } from "react-native-elements";
  import React, { useState } from "react";
  import Color from "../src/Common/Color.js";
  import { useNavigation } from "@react-navigation/native";
  import { useTranslation } from "react-i18next";
  import Signup from "../src/screens/Signup.js";
  
  const AddManager = () => {
    const navigation = useNavigation();
    const [t, i18n] = useTranslation();
  

  

  
    return (
      <View style={styles.container}>

        <Signup />

        

        </View>
    );
  };
  
  export default AddManager;
  
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },

  });
  