import React from "react";
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Color from "../Common/Color.js"
import { Ionicons } from '@expo/vector-icons'
import Spacing from '../Common/Spacing.js'
import One from '../../assets/9.jpg';

const ChoseScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={One} style={styles.image}>
            <View>
            <TouchableOpacity style={{marginLeft: Spacing*2, marginTop: Spacing*3}} 
                 onPress={() => {
                 navigation.navigate('Homee');
                }}>
                    <Ionicons name="arrow-back" color={Color.primary} size={Spacing*2}/>
                </TouchableOpacity>
            </View>
            
        <TouchableOpacity onPress={() => {
            navigation.navigate('Signup');
          }}>
       <Text style={[styles.buttonStyle, styles.buttonStyle1]}>sign up</Text>
      </TouchableOpacity>  


      <TouchableOpacity onPress={() => {
            navigation.navigate('Login');
          }}>
       <Text style={[styles.buttonStyle, styles.buttonStyle2]}>sign in</Text>
      </TouchableOpacity>  
        </ImageBackground>
    );
};

export default ChoseScreen;

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },

    container: {
        color: Color.primary,
        alignItems: 'center',
        alignSelf: "center",
        fontWeight: "bold",
        paddingTop: 150,
        marginLeft: 180,
        fontSize: 20,
    },
    
    continueButton: {
        backgroundColor: 'transparent',  // جعل اللون شفافًا
        borderWidth: 1,  // إضافة حدود للتأكيد على الموقع
        borderColor: Color.primary,  // لون الحدود
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    
    buttonStyle:{
        padding: 20,
        marginBottom: 5,
        marginHorizontal: 10,
        fontWeight: '300',
        fontSize: 20,
        textAlign:"center",
        borderRadius: 20,
        textTransform: "uppercase",
        letterSpacing: 2,
      },
      buttonStyle1:{
        backgroundColor: Color.primary,
        color:"#fff",
        marginTop: 150,
      },
      buttonStyle2:{
        borderColor: Color.primary,
        backgroundColor: "transparent",
        color:Color.primary,
        marginTop: 7,
      },
    continueButtonText: {
        color: Color.primary,
        fontSize: 18,
        
    },
});
