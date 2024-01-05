import {
    View,
    Text, 
    FlatList,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    PermissionsAndroid 
  } from "react-native";
  import CustomSearchBar from "../Common/SearchBarComponent.js";
  import Header from "../screens/Header.js";
  import NavbarButtom from "../Common/NavbarButtom.js";
  import Color from "../Common/Color.js";
  import Spacing from "../Common/Spacing.js";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import React, { useState, useEffect } from "react";
 // import Pdf from 'react-native-pdf';

  
  const JobHistory = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const handleHomePress = (item) => {
      navigation.navigate("MainScreen2", { item });
    };
  

    const baseUrl = "https://ayabeautyn.onrender.com";

    const requestGalleryPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your gallery to choose images.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Gallery permission granted');
          } else {
            console.log('Gallery permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
  
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/uploadjobs/uploadjob`
        );
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    
  
    useEffect(() => {
      requestGalleryPermission();
      fetchData();
    }, []);
  
    return (
        <View style={styles.container}>
          <Header />
          <View style={styles.container2}>
            <Text style={[styles.styleText, styles.styleText2]}>Job History.</Text>
            <CustomSearchBar placeholder={"Search Customer"} />
          </View>
      
         
      
          <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.appointmentContainer}>
                <View style={styles.userContainer}>
                  <Text style={styles.userName}>{item.user_name}</Text>
                  <Text style={styles.appointmentContent}>
                    Job Name: {item.jobName}
                  </Text>
                
                  <Text>CV File: {item.image.secure_url}</Text>

                </View>
              </View>
            )}
          />
      
          <TouchableOpacity onPress={handleHomePress}>
            <Text style={styles.buttonStyle}>Home</Text>
          </TouchableOpacity>
      
          <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
        </View>
      );
      
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.secondary,
    },
    appointmentContainer: {
      backgroundColor: "#ffffff",
      margin: 15,
      marginBottom:2,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: Color.primary,
       position: "relative",
    },
    userContainer: {
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      padding: 20,
     
  
    },
    userName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#555555",
    },
    appointmentContent: {
      fontSize: 17,
      color: "#848482",
      fontWeight: "bold",
    },
    styleText: {
      color: Color.primary,
      fontSize: Spacing * 2,
      textTransform: "uppercase",
      fontWeight: "bold",
      marginTop: 20,
      marginLeft: 10,
      marginBottom: -15,
    },
    buttonStyle: {
      width: "35%",
      padding: 10,
      marginHorizontal: 250,
      fontWeight: "400",
      fontSize: 18,
      letterSpacing: 2,
      textAlign: "center",
      color: Color.secondary,
      backgroundColor: Color.primary,
      alignSelf: "center",
      marginTop: 15,
    },
    deleteIcon: {
      marginTop: -80,
    },
    removeButton: {
      position: "absolute",
      top: Spacing/2,
      left: Spacing*22,
      padding: Spacing / 2,
      zIndex: 1, 
    },
  });
  
  export default JobHistory;
  