import React from "react";
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import One from '../../assets/3.jpeg';

const Home = () => {
    const navigation = useNavigation();

    const handleContinuePress = () => {
        navigation.navigate('Signup'); // اسم الشاشة التي تريد التنقل إليها
    };

    return (
        <ImageBackground source={One} style={styles.image}>
            <View>
                <Text style={styles.container}>INNER GLOW, DISCOVER YOUR BEAUTY!</Text>
            </View>
            
            <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                <Text style={styles.continueButtonText}>Continue</Text>
                
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default Home;

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },

    container: {
        color: "white",
        alignItems: 'center',
        alignSelf: "center",
        paddingTop: 100,
        fontSize: 20,
    },
    
    continueButton: {
        backgroundColor: 'transparent',  // جعل اللون شفافًا
        borderWidth: 1,  // إضافة حدود للتأكيد على الموقع
        borderColor: 'white',  // لون الحدود
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        
    },

    

});
