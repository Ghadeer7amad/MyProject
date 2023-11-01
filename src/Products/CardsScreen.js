import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity} from 'react-native'
import React from 'react'
import { useState } from 'react'
import Color from '../Common/Color.js';
import Products from "./ProductData.js"
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import Spacing from "../Common/Spacing.js"

const CardsScreen = () => {
  const [isTouched, setIsTouched] = useState(false);
  const handlePressIn = () => {
    setIsTouched(true);
  };
  const handlePressOut = () => {
    setIsTouched(false);
  };

  return (
    <View style={{backgroundColor: "#fff5f5", height:"100%"}}>
      <View style={{padding: 40}}>
      <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Ionicons name="arrow-back" color={Color.background} style={{fontSize: 30}}/>
            <View style={styles.imageContainer}>
                    <BlurView style={{height: "100%", padding: Spacing/4}}>
                        <Image source={require("../../assets/aya5.jpg")} style={styles.imageStyle}/>
                    </BlurView>
             </View>
      </TouchableOpacity>
      
      <View style={{flexDirection:"column"}}>
        <Text style={{fontSize: 30, textAlign:"left", color: "#929aab"}}>Shopping</Text>
        <Text style={{fontSize: 30, fontWeight:"bold", textAlign:"left", color:"black"}}>Cart</Text>
        </View>
      </View>
      
        
    
        <ScrollView style={{marginTop: 10}}>
        {Products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <View style={{width:"100%",flexDirection:"row", justifyContent:"flex-start"}}>
            <Image source={product.image} style={styles.productImage} />

            <View style={{flexDirection:"column"}}>

            <View style={{flexDirection: "row", width: "70%", marginBottom: 10}}>
            <Text style={styles.productName}>{product.name}</Text>
            <Ionicons name="heart" color={Color.primary} style={{marginLeft: "auto", fontSize: 25}}/>
            </View>
            
            <View style={{flexDirection:"row", width: "70%", marginBottom: 10}}>
            <Text style={styles.productIncluded}>{product.included}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            </View>


            <View style={{flexDirection:"row"}}>

            <View>
            <Ionicons name="trash-bin" color={Color.background} style={{fontSize: 25, marginRight: 70}}/>
            </View>
             
            <View style={{flexDirection:"row", backgroundColor:Color.background, alignItems:"center", borderRadius: 5, padding: 5, paddingLeft: 10, paddingRight: 10}}>
              <Ionicons name="add" color={Color.background} style={{fontSize: 30, backgroundColor: "#f0fbff"}}/>  
              <Text style={{textAlign:"center", marginLeft: 10, marginRight: 10, color: Color.secondary}}>1</Text>
              <Ionicons name="remove-outline" color={Color.background} style={{marginLeft: "auto", fontSize: 30, backgroundColor: "#f0fbff"}}/>
            </View> 
            </View>
            </View>
            </View>
          </View>

          
        ))}
          <View style={{flexDirection:"row", justifyContent: "space-between", margin: 20, borderBottomWidth: 1, borderColor:"black"}}>
            <Text style={{fontSize: 25, color: "black"}}>Total Price</Text>
            <Text style={{fontSize: 25, color: "#929aab"}}>$40</Text>
          </View>

        <TouchableOpacity  
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
          style={[
            styles.ButtonStyle,
            isTouched ? styles.touchedText : null]}>
          <Text
            style={[
              styles.styleTextButton,
              isTouched ? styles.touchedTextButton : null]}>Check Out</Text>

        </TouchableOpacity>
        
      </ScrollView>
      
    </View>
  )
}

export default CardsScreen

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 40,
  },
  productImage: {
    width: 150,
    height: 140,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black", 
  },
  productIncluded:{
    fontSize: 15,
    color: "#929aab"
  },
  productPrice:{
    fontSize: 15,
    color: "black",
    marginLeft: "auto"
  },
  imageStyle:{
    height:"100%",
    width:"100%",
},
imageContainer:{
  width: Spacing * 4,
  height : Spacing * 4,
  overflow: "hidden",
  borderRadius: Spacing*2
},
touchedText: {
  backgroundColor: Color.background,
},
touchedTextButton:{
  color: Color.secondary
},
styleTextButton:{
  color: Color.secondary,
  fontSize: Spacing * 1.5,
  fontWeight: "500"
},
ButtonStyle:{
  backgroundColor: Color.primary,
  marginBottom: 30,
  margin: 20,
  padding: 15,
  marginTop: 30,
  justifyContent: "center",
  alignItems: "center",
}
})