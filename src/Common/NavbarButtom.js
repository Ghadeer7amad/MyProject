import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import  Color from "./Color.js"


const FooterMenu = () => {
    return (
        
        <View style = {styles.container}>
          <TouchableOpacity>
            <Ionicons name="home-outline" style = {styles.iconStyle} />
            <Text style = {styles.textStyle}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Ionicons name="notifications-outline" style = {styles.iconStyle} />
            <Text style = {styles.textStyle}>NOTIFICATIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <MaterialIcons name="favorite-border" style = {styles.iconStyle} />
            <Text style = {styles.textStyle}>FAVORITES</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Ionicons name="settings-outline" style = {styles.iconStyle} />
            <Text style = {styles.textStyle}>SETTINGS</Text>
        </TouchableOpacity>
        </View>
        
        
    )
}

export default FooterMenu;

const styles = StyleSheet.create({

    container: {
        
    flexDirection: "row",
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: Color.secondary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    },

    iconStyle: {
        color: Color.primary,
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.30)', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5, 

    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    }
    

});