import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Settings from "../CommonNav/Settings";


const FooterVar = () => {

    const navigation = useNavigation();

    const handleSettingsPress = () => {
        navigation.navigate('Settings');
      };

    const handleHomePress = () => {
        navigation.navigate('Chose');
      };


    return (
    <View style = {styles.containerr}>
        <View style = {styles.container}>
          <TouchableOpacity onPress={handleHomePress} style = {styles.iconContainer}>
            <FontAwesome name="home"  style = {styles.iconStyle}/>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.iconContainer2}>
            <Ionicons name="notifications-outline" style = {styles.iconStyle} />
        </TouchableOpacity>

        <TouchableOpacity style = {styles.iconContainer}>
            <MaterialIcons name="favorite" style = {styles.iconStyle} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSettingsPress} style = {styles.iconContainer2}>
            <Ionicons name="settings-outline" style = {styles.iconStyle} />
        </TouchableOpacity>
        </View>
        </View>
        
        
    )
}

export default FooterVar;

const styles = StyleSheet.create({

    container: {
        
    flexDirection: "row",
    padding: 10,
    justifyContent: 'space-between',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 22, 
    borderBottomRightRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 65,
    margin: 7,
   

    },

    containerr: {
        backgroundColor: '#856c8b'

    },

    iconStyle: {
        color: 'white',
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25,

    },

    iconContainer: {
        backgroundColor: '#765680',
        borderRadius: 15, 
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    
    iconContainer2: {
        backgroundColor: '#896d91',
        borderRadius: 15, 
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },

    textStyle: {
        color: '#5e366a',
        fontWeight: 'bold',
    }
    

});