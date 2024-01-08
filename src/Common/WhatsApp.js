import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import Color from "../Common/Color.js";


const WhatsApp = () => {
    const openWhatsAppChat = () => {
      const whatsappNumber = '+970592953343'; 
      const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;
      Linking.openURL(url);
    };
  
    return (
      <TouchableOpacity onPress={openWhatsAppChat} style={{ position: 'absolute', bottom: 70, right: 22,zIndex:1000,backgroundColor:Color.primary,padding:20,borderRadius:50 }}>
        <Icon name="whatsapp" size={50} color='white' />
      </TouchableOpacity>
    );
  };

  export default WhatsApp;