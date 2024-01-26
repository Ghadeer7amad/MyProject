import React from "react";
import {  TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Color from "../Common/Color.js";

const WhatsApp = () => {
  const openWhatsAppChat = () => {
    const whatsappNumber = "+972595671000";
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      onPress={openWhatsAppChat}
      style={{
        position: "absolute",
        bottom: 84,
        right: 14,
        zIndex: 1000,
        backgroundColor: Color.primary,
        padding: 20,
        borderRadius: 50, 
        width: 80, 
        height: 80,
        justifyContent: "center", 
        alignItems: "center", 
      }}
    >
      <Icon name="whatsapp" size={40} color="white" />
    </TouchableOpacity>
  );
};

export default WhatsApp;
