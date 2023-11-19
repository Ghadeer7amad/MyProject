import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
  } from "react-native";
import React, { useState } from "react";
import Spacing from "../Common/Spacing.js";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import NavbarTop from "../Common/navbarTop.js";
import Color from "../Common/Color.js";
import Categories from "./Categories.js"
import Product from "./ProductData.js"; 
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'; 
import SearchProANDSer from "../Common/SerachProANDSer.js";
import ProductData from "./ProductData.js";
import ProductsDetails from "./ProductsDetails.js";
  
const ProductsScreens = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigation = useNavigation();

    const handleCardsPress = () => {
        navigation.navigate('CardsScreen');
      };

    const handleFavoritePress = () => {
        navigation.navigate('Favorite');
      };

      const handleDetailsPress = (product) => {
        navigation.navigate('ProductsDetails', { product });
      };
      

  return (
    <View style={{backgroundColor: Color.secondary, height:"100%"}}>
    <SafeAreaView>
        <ScrollView style={{padding: Spacing*0.5}}>
          <NavbarTop/>

          <View style={{width:"100%"}}>
            <Text style={styles.styleText}>find the best <Image style={{ width: 50, height: 50 }} source={require("../../assets/122.jpg")} /></Text>
            <Text style={[styles.styleText, styles.styleText2]}>product for you</Text>
            
        <SearchProANDSer/>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.Sub1}>body</Text>
        <Text style={styles.Sub2}>face</Text>
        </View>
        <Image style={{height: 300, resizeMode: 'contain', width: '100%'}}
        source={require("../../assets/back.jpg")}/>
        <Text style={{fontSize: 15, textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', marginTop: 15}}>chose product now!</Text>
        <Categories/>
        </View>
        
    <View style={styles.ProductStyle}>
        {Product.map(Product => 
          <View key={Product.id} style={styles.EveryProduct}>
            <BlurView tint= 'default' intensity={90} style={{padding: Spacing/2}}>
              <TouchableOpacity  
              style={{width:"100%", height:150}} onPress={() => handleDetailsPress(Product)} >
               <Image source={Product.image} style={styles.ImageStyle} />
                <View style={styles.StyleTop}>
                  <BlurView style={styles.BlurViewTop}>
                  <Ionicons name="star" color={Color.primary} size={Spacing*1.4} onPress={handleFavoritePress}/>
                  <Text style={styles.RatingStyle}>{Product.rating}</Text>
                  </BlurView>
                </View>

              </TouchableOpacity>
              <Text style={styles.NameStyle}>{Product.name}</Text>
              <Text style={styles.includedStyle}>{Product.included}</Text>

          <View style={styles.styleRow}>
              <View style={{flexDirection:"row"}}>
                <Text style={styles.styleDollerSign}>$</Text>
                <Text style={styles.PriceStyle}>{Product.price}</Text>
              </View>

              <TouchableOpacity style={styles.styleIcons} onPress={handleCardsPress}>
                <Ionicons name="add" size={Spacing*2} color={Color.secondary}/>
              </TouchableOpacity>
              </View>
            </BlurView>
          </View>
          )
        }
    </View>
        </ScrollView>
     </SafeAreaView>
    </View>     
  )
}

export default ProductsScreens


const styles = StyleSheet.create({
   ProductStyle:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-around",
   },
   EveryProduct:{
    width:"45%",
    marginBottom: 30,
    overflow:"hidden",
    backgroundColor: '#986ead',
   },
   Sub1:{
    backgroundColor: Color.background,
    marginLeft: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize'
   },
   Sub2:{
    backgroundColor: Color.secondary,
    marginLeft: 30,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    color: 'black',
    borderWidth: 1,
    borderColor: Color.background,
    fontWeight: 'bold',
    textTransform: 'capitalize'
   },
   ImageStyle:{
    width:"100%",
    height:"100%",
    borderRadius:Spacing/2
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
   RatingStyle:{
    color:"#fff",
    marginLeft: Spacing/2
   },
   NameStyle:{
    color: Color.primary,
    fontWeight:"bold"
   },
   includedStyle:{
    color: Color.primary,
    fontSize: 12
   },
   styleRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center"
   },
   styleDollerSign:{
    color: Color.primary,
    fontWeight: "bold",
    fontSize: 20
   },
   PriceStyle:{
    color:"#d9b650",
    fontWeight: "bold",
    fontSize: 20
   },
   styleIcons:{
    backgroundColor:Color.primary,
    padding: Spacing/4,
    borderRadius: Spacing
   },
    styleText:{
        color: 'black',
        fontSize: Spacing * 2,
        textTransform:"uppercase",
        fontWeight: "bold"
    },  
    styleText2:{
      color: "#d9b650"
    }
})