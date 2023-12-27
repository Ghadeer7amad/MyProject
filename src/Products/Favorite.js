import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { useState } from 'react'
import Color from '../Common/Color.js';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Spacing from "../Common/Spacing.js"
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import {removeFromFavorites} from '../redux/user/userActions.js'

const FavoriteScreens = ({ favoriteProducts }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isTouched, setIsTouched] = useState(false);
  const handlePressIn = () => {
    setIsTouched(true);
  };
  const handlePressOut = () => {
    setIsTouched(false);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductsDetails', { product });
  };
  const confirmDelete = (productId) => {
    console.log('Confirm delete for product with ID:', productId);
    dispatch(removeFromFavorites(productId));
  };
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={{ padding: 40 }}>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Ionicons name="arrow-back" color={Color.background} style={{ fontSize: 30 }} onPress={() => navigation.navigate('ProductsScreens')} />
          <View style={styles.imageContainer}>
            <View style={{ height: "100%", padding: Spacing / 4 }}>
              <Ionicons name="cart" color={Color.background} size={Spacing * 2} onPress={() => navigation.navigate('CardsScreen')} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 30, textAlign: "left", color: "#929aab" }}>Favorite</Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "left", color: "black" }}>Products</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ marginTop: 5 }}>
      {favoriteProducts && favoriteProducts.length > 0 ? (
      favoriteProducts && favoriteProducts.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.productContainer}
            onPress={() => handleProductPress(product)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
      <TouchableOpacity
         style={styles.removeButton}
         onPress={() => confirmDelete(product._id)}>
         <Ionicons name="trash" color="red" size={Spacing} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: product.image.secure_url }} style={styles.productImage} />
          <View style={{ flexDirection: 'column' }}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={{ flexDirection: 'row', width: '70%', marginBottom: 10 }}>
          <Text style={styles.productPrice}>${product.finalPrice}</Text>
          </View>
         </View>
      </View>
        </TouchableOpacity>
        ))
       ): (
          <View style={styles.noFavoritesContainer}>
            <Text style={styles.noFavoritesText}>No favorite products available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
  favoriteProducts: state.user.favorites,
});
export default connect(mapStateToProps)(FavoriteScreens);

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
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginTop: 10
  },
  productPrice:{
    fontSize: 15,
    color: "#929aab"
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
},
removeButton: {
  position: "absolute",
  top: Spacing*5,
  left: Spacing*20,
  padding: Spacing/10,
  zIndex: 1, 
},
noFavoritesContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},

noFavoritesText: {
  textAlign: 'center',
  fontSize: 16,
  color: '#929aab',
},
})