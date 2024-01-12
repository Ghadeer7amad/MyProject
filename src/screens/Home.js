import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Common/Color.js";
import One from '../../assets/face.jpg';
import { useTranslation } from 'react-i18next'; 

const Homee = () => {
    const navigation = useNavigation();
    const [t, i18n] = useTranslation();

    const isArabic = i18n.language === 'ar';

    const handleContinuePress = () => {
        navigation.navigate('ChoseScreen');
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <ImageBackground source={One} style={styles.image}>
            <View>
                <Text style={[styles.container1, isArabic && styles.arabicText]}>{t('Hello lady')}</Text>
                <Text style={[styles.container, isArabic && styles.arabicText]}>
                    <Text style={{ color: "#f4991a" }}>{t('thank you')}</Text>
                    {'\n'}{t('chhoosing')}
                    {'\n'}{t('click')} {'\n'}
                    <Text style={{ color: "#e2bf81" }}>{t('register')}</Text> {t('or')}{' '}
                    <Text style={{ color: "#e2bf81" }}>{t('login')}</Text>
                </Text>
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                <Text style={styles.continueButtonText}>{t('Continue')}</Text>
            </TouchableOpacity>

            <View style={styles.languageContainer}>
                <TouchableOpacity onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageText}>English</Text>
                </TouchableOpacity>
                <Text style={styles.separator}>|</Text>
                <TouchableOpacity onPress={() => changeLanguage('ar')}>
                    <Text style={styles.languageText}>العربية</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 16,
        textTransform: "uppercase",
        lineHeight: 24,
        marginLeft: 180
    },
    arabicText: {
        textAlign: 'right', // Adjust styles for Arabic text alignment
        marginLeft: 180,
        marginRight: 2,
        fontWeight: 'bold',
        lineHeight: 28,
    },
    continueButton: {
        backgroundColor: 'transparent',  
        borderWidth: 1,  
        borderColor: Colors.primary,  
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        position: 'absolute',
        bottom: 70,
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    continueButtonText: {
        color: Colors.primary,
        fontSize: 18,  
    },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 560, 
    },
    languageText: {
        color: Colors.primary,
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
    },
    separator: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
