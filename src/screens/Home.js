import React from "react";
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Common/Color.js"
import One from '../../assets/face.jpg';

const Homee = () => {
    const navigation = useNavigation();
  

    const handleContinuePress = () => {
        navigation.navigate('AddServices'); 
    };

    return (
        <ImageBackground source={One} style={styles.image}>
            <View>
                <Text style={styles.container1}>Hello lady</Text>
                <Text style={styles.container}><Text style={{ color: "#f4991a" }}>thank you </Text>{'\n'}for choosing our application,
                 {'\n'}Click continue to {'\n'}<Text style={{ color: "#e2bf81" }}>register</Text> or <Text style={{ color: "#e2bf81" }}>login!!</Text></Text>
            </View>
            
            <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </ImageBackground>
        
    );
};

export default Homee;

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    container1: {
        color: Colors.primary,
        alignItems: 'center',
        alignSelf: "center",
        fontWeight: "bold",
        paddingTop: 110,
        marginBottom: 20,
        fontSize: 28,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginLeft: 180
    },
    container: {
        color: Colors.background,
        alignItems: 'center',
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 15,
        textTransform: "uppercase",
        lineHeight: 24,
        marginLeft: 180
    },
    
    continueButton: {
        backgroundColor: 'transparent',  // جعل اللون شفافًا
        borderWidth: 1,  // إضافة حدود للتأكيد على الموقع
        borderColor: Colors.primary,  // لون الحدود
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    
    continueButtonText: {
        color: Colors.primary,
        fontSize: 18,
        
    },

    

});
