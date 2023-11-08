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
import CustomSearchBar from "../Common/SearchBarComponent.js";
import NavbarTop from "../Common/navbarTop.js";

import Color from "../Common/Color.js";
import Service from "./ServiceData.js";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavbarButtom from "../Common/NavbarButtom";

const ServicesScreen = () => {
  const navigation = useNavigation();

  const handleBookPress = () => {
    navigation.navigate("BookingScreen");
  };

  const handleDetailsPress = (service) => {
    navigation.navigate("ServiceDetails", { service });
  };

  return (
    <View style={styles.container}>
        <ScrollView style={{ padding: Spacing }}>
          <NavbarTop />

          <View style={{ width: "100%" }}>
            <Text style={styles.styleText}>Here</Text>
            <Text style={[styles.styleText, styles.styleText2]}>Our Services</Text>

            <CustomSearchBar placeholder="Search your service" />
          </View>

          <View style={styles.ServiceStyle}>
            {Service.map((service) => (
              <View key={service.id} style={styles.EveryService}>
                <BlurView tint="default" intensity={90} style={{ padding: Spacing / 2 }}>
                  <TouchableOpacity
                    style={{ width: 300, height: 250 }}
                    onPress={() => handleDetailsPress(service)}
                  >
                    <Image source={service.image} style={styles.ImageStyle} />

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
                      <Text style={styles.PriceStyle}>{service.price} LIS</Text>
                      <Text style={styles.PriceStyle}></Text>
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
    backgroundColor: Color.background,
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
    fontSize:25,
    marginLeft:8,
    marginTop:8,
   },
   styleRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center"
   },
   PriceStyle:{
    color: "#fff",
    fontWeight: "bold",
    fontSize:18,
    marginLeft:8,
   },
   styleIcons:{
    backgroundColor:Color.primary,
    padding: Spacing/2,
    borderRadius: Spacing,

   },
   details:{
    color: "#d9b650",
    fontSize: 17,
    fontWeight:"bold",
    padding:3
   },
    styleText:{
        color: Color.secondary,
        fontSize: Spacing * 2,
        textTransform:"uppercase",
        fontWeight: "bold"
    },  
    styleText2:{
      color: "#d9b650"
    }
})