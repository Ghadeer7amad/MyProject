import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Spacing from "../Common/Spacing.js";
import NavbarTop from "../Common/navbarTop.js";
import SearchProANDSer from "../Common/SerachProANDSer.js"
import Color from "../Common/Color.js";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation} from "@react-navigation/native";
import NavbarButtom from "../Common/NavbarButtom";
import { serialize } from "object-to-formdata";

const ServicesScreen = () => {
  const navigation = useNavigation();
  const [Services, setServices] = useState(null);
  //const userRole = "Admin"; 
  const [FData, setFData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    time: "",
    subServices: [],
    status: [],
    image: "",
  });
  const [image, setImage] = useState(null);

  const handleBookPress = () => {
    navigation.navigate("BookingScreen");
  };

  const handleDetailsPress = (service) => {
    navigation.navigate("ServiceDetails", { service });
  };
  const baseUrl = "https://ayabeautyn.onrender.com";
  useEffect(() => {
    console.log("Fetching services...");
    fetch(`${baseUrl}/services/getServices`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        setServices(data.Services);
      })
      .catch((error) => console.log('Error from favs screen: ', error.message));
  }, []);

  const handleRemoveService = async (itemId) => {
    console.log('Deleting item with ID:', itemId);
    try {
      const response = await fetch(`${baseUrl}/services/hardDelete/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setServices((prevServices) => prevServices.filter(service => service._id !== itemId));
      } else {
        const responseData = await response.json();
        console.error('Failed to delete item. Server response:', responseData);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const  handleSoftDeleteService = async (itemId) => {
    console.log('SoftDelete item with ID:', itemId);
    try {
      const response = await fetch(`${baseUrl}/services/softDelete/${itemId}`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setServices((prevServices) => prevServices.filter(service => service._id !== itemId));
      } else {
        const responseData = await response.json();
        console.error('Failed to SoftDelete item. Server response:', responseData);
      }
    } catch (error) {
      console.error('Error SoftDelete item:', error);
    }
  };

  /*const  handleEditService = async (itemId) => {
    console.log('EditService item with ID:', itemId);
    try {
      const response = await fetch(`${baseUrl}/services/updateServices/${itemId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        navigation.navigate("AddServices", { editedItemId: itemId });
      } else {
        const responseData = await response.json();
        console.error('Failed to EditService item. Server response:', responseData);
      }
    } catch (error) {
      console.error('Error EditService item:', error);
    }
  };*/

  return (
    <View style={styles.container}>
        <ScrollView style={{ padding: Spacing }}>
          <NavbarTop />

          <View style={{ width: "100%" }}>
            <Text style={styles.styleText}>Here <Image style={{ width: 80, height: 60 }} source={require("../../assets/111.jpg")} /></Text>
            <Text style={[styles.styleText, styles.styleText2]}>Our Services</Text>

            <SearchProANDSer placeholder="Search your service" />
          </View>

          <View style={styles.ServiceStyle}>
          {Services && Services.length > 0 && Services.map((service, index) => (
              <View key={index} style={styles.EveryService}>
                <BlurView tint="default" intensity={90} style={{ padding: Spacing*3}}>

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveService(service._id)}>
                    <Ionicons name="close" color="red" size={Spacing*1.5} />
                </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeButton1}
                    onPress={() => handleSoftDeleteService(service._id)}>
                    <Ionicons name="trash-bin" color="#fff" size={Spacing*1.2} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditService(service._id)}>
                    <Ionicons name="pencil" color="red" size={Spacing} />
                </TouchableOpacity>
              
                  <TouchableOpacity
                    style={{ width: 300, height: 250 }}
                    onPress={() => handleDetailsPress(service)}>
                    <Image source={{uri: service?.image?.secure_url}} style={styles.ImageStyle} />
                    <View style={styles.StyleTop}>
                      <BlurView style={styles.BlurViewTop}>
                        <Ionicons
                          name="ios-calendar"
                          style={styles.BookStyle}
                          color={Color.primary}
                          size={Spacing * 1.8}
                          onPress={handleBookPress}
                        />
                      </BlurView>
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.NameStyle}>{service.name}</Text>

                  <View style={styles.styleRow}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.PriceStyle}>{service.finalPrice}<Text style={{color:'black'}}> LIS</Text></Text>
                      {service.price && (
                        <Text style={styles.OldPriceStyle}>{service.price}<Text style={{ color: 'red', textDecorationLine: 'line-through' }}> LIS</Text></Text>
                      )}
                    </View>
                    <TouchableOpacity style={styles.styleIcons} onPress={() => handleDetailsPress(service)}>
                      <Text style={styles.details}>More Details</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
            ))}
          </View>
        </ScrollView>   
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)}/>
    </View>
  );
};

export default ServicesScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
    height: "100%" 
  },
   ServiceStyle:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
   },
   EveryService:{
    width:"100%",
    marginBottom: 30,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: Color.background,
    borderRadius: 20
   },
   removeButton: {
    position: "absolute",
    top: Spacing,
    right: Spacing,
    padding: Spacing / 2,
    zIndex: 1, 
  },
  removeButton1: {
    position: "absolute",
    top: Spacing,
    left: Spacing,
    padding: Spacing / 2,
    zIndex: 1, 
  },
  editButton:{
    position: "absolute",
    top: Spacing,
    left: Spacing*3,
    padding: Spacing / 2,
    zIndex: 1, 
  },
   ImageStyle:{
    width:"100%",
    height:"100%",
    borderRadius:Spacing/2,
    resizeMode:"cover",
   },
   StyleTop:{
    position:"absolute",
    right:0,
    borderBottomStartRadius: Spacing*5,
    borderTopEndRadius: Spacing,
    overflow:"hidden"
   },
   BlurViewTop:{
    flexDirection:"row",
    padding: Spacing/2,
    backgroundColor: Color.background
   },
   BookStyle:{
    color:Color.primary,
    marginLeft: Spacing
   },
   NameStyle:{
    color: Color.primary,
    fontWeight:"bold",
    fontSize:20,
    marginLeft:8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop:8,
   },
   styleRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center"
   },
   PriceStyle:{
    color: "black",
    fontWeight: "bold",
    fontSize:16,
    marginLeft:8,
   },
   OldPriceStyle:{
    color: "red",
    fontWeight: "bold",
    fontSize:16,
    marginLeft:8,
    textDecorationLine: 'line-through'
   },
   styleIcons:{
    backgroundColor:Color.primary,
    padding: Spacing/2,
    borderRadius: Spacing,

   },
   details:{
    color: "#d9b650",
    fontSize: 15,
    fontWeight:"400",
    padding:4
   },
    styleText:{
        color: 'black',
        fontSize: Spacing * 1.8,
        textTransform:"uppercase",
        fontWeight: "bold",
        marginTop: 5
    },  
    styleText2:{
      color: Color.background
    }
})