import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity} from 'react-native'
import React from 'react'
import { useState } from 'react'
import Color from '../Common/Color.js';
import Products from "./ProductData.js"
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Spacing from "../Common/Spacing.js"

const FavoriteScreens = () => {
  const navigation = useNavigation();
  const [isTouched, setIsTouched] = useState(false);
  const handlePressIn = () => {
    setIsTouched(true);
  };
  const handlePressOut = () => {
    setIsTouched(false);
  };

  const handleProductPress = () => {
      navigation.navigate('ProductsScreens');
    };

  return (
    <View style={{backgroundColor: "#fff", height:"100%"}}>
      <View style={{padding: 40}}>
      <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Ionicons name="arrow-back" color={Color.background} style={{fontSize: 30}} onPress={()=>navigation.navigate('ProductsScreens')}/>
            <View style={styles.imageContainer}>
                    <View style={{height: "100%", padding: Spacing/4}}>
                    <Ionicons name="cart" color={Color.background} size={Spacing*2} onPress={()=>navigation.navigate('CardsScreen')}/>
                    </View>
             </View>
      </TouchableOpacity>
      
      <View style={{flexDirection: "row"}}>
      <View style={{flexDirection:"column"}}>
        <Text style={{fontSize: 30, textAlign:"left", color: "#929aab"}}>Favorite</Text>
        <Text style={{fontSize: 30, fontWeight:"bold", textAlign:"left", color:"black"}}>Products</Text>
      </View>

      </View>
      </View>
      
        <ScrollView style={{marginTop: 5}}>
        {Products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <View style={{width:"100%",flexDirection:"row", justifyContent:"flex-start"}}>
            <Image source={product.image} style={styles.productImage} />

            <View style={{flexDirection:"column"}}>

            <Text style={styles.productName}>{product.name}</Text>

            <View style={{flexDirection:"row", width: "70%", marginBottom: 10}}>
            <Text style={styles.productIncluded}>{product.included}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            </View>

            </View>
            </View>
            </View>
          

          
        ))}
        
      </ScrollView>
      
    </View>
  )
}

export default FavoriteScreens

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 25,
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
    marginTop: 40
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
  backgroundColor: "#acdcee",
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
  backgroundColor: Color.background,
  marginBottom: 30,
  margin: 20,
  padding: 15,
  marginTop: 30,
  justifyContent: "center",
  alignItems: "center",
}
})