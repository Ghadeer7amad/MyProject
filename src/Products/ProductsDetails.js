import { ImageBackground,
   ScrollView, 
   StyleSheet, 
   Text,
   TouchableOpacity,
   View, 
   Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Color from '../Common/Color.js'
import Spacing from '../Common/Spacing.js'
import { BlurView } from 'expo-blur'

const { height} = Dimensions.get("window");

const ProductsDetails = ({ route }) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const [isTouched, setIsTouched] = useState(false);
  const handlePressIn = () => {
    setIsTouched(true);
  };
  const handlePressOut = () => {
    setIsTouched(false);
  };
  return (
    <ScrollView style={{padding: Spacing, backgroundColor: Color.background}}>
        <SafeAreaView>
        <ImageBackground source={product.image}
          style={styles.ImageBackgroundStyle}  imageStyle={{borderRadius: Spacing * 1.5, marginTop: 20}}>

            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableOpacity style={{padding: Spacing*2}}  onPress={()=>navigation.navigate('ProductsScreens')}>
                    <Ionicons name="arrow-back" color={Color.primary} size={Spacing*2}/>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: Spacing*2}}>
                    <Ionicons name="cart" color={Color.primary} size={Spacing*2}  onPress={()=>navigation.navigate('CardsScreen')}/>
                </TouchableOpacity>
            </View>


            <View style={{borderRadius: Spacing, overflow:"hidden"}}>
                <BlurView tint="light" style={styles.BlurViewStyle}>
                    <View>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={{color:"black"}}>{product.included}</Text>

                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <View style={styles.iconRating}>
                        <Ionicons name="star" size={Spacing * 1.5} color={Color.primary}/>
                        <Text style={styles.productRating}>{product.rating}</Text>
                    </View>

                    <View 
                      style={styles.TowIcaonStyle}>
                        <View style={styles.icaonPosition}>
                        <Ionicons name="heart" size={Spacing * 2} color={Color.primary}/>
                        <Text style={styles.icanNameStyle}>Favorite</Text>
                        </View>
                    </View>

                    </View>
                   </View>
                </BlurView>
            </View>
            </ImageBackground> 
    <View>    
      <View>
      <View>
        <Text style={styles.descriptionText}> Description </Text>
      </View>
      </View>
        <Text style={styles.DiscriptionStyle}>{product.description}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
          <View style={{marginTop: 30, paddingLeft: 5}}>
          <Text style={styles.priceStyle}>
            Price
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.DollerStyle}>$</Text>
            <Text
              style={styles.priceStyle}>{product.price}</Text>
          </View>
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
              isTouched ? styles.touchedTextButton : null]} onPress={()=>navigation.navigate('CardsScreen')}>Buy Now</Text>

        </TouchableOpacity>
    </View>
        
        </SafeAreaView>
    </ScrollView>
  )
}

export default ProductsDetails

const styles = StyleSheet.create({
  ImageBackgroundStyle:{
    height: height*0.7,
    justifyContent:"space-between", 
    padding: 0
  },
  BlurViewStyle:{
    padding: Spacing*1.5
  },
  productName:{
    fontSize:Spacing*2,
    fontWeight:"bold",
    color:Color.primary,
    marginBottom: Spacing/3
  },
  iconRating:{
    flexDirection: "row",
    marginTop: Spacing, 
    alignItems:"center"
  },
  productRating:{
    color: "black",
    marginLeft: Spacing/2
  },
  TowIcaonStyle:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
  },
  icaonPosition:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
    marginRight: Spacing,
  },
  icanNameStyle:{
    color: Color.primary,
    fontSize: Spacing,
  },
  DiscriptionStyle:{
    fontSize: Spacing,
    lineHeight: Spacing*1.3,
    color: Color.secondary,
  },
  DollerStyle:{
    color: Color.primary,
    fontSize: Spacing * 1.5
  },
  priceStyle:{
    fontSize: Spacing*1.5,
    marginLeft: Spacing / 2,
    color: Color.secondary,
  },
  descriptionText: {
    fontSize: Spacing*2,
    color: "black",
    marginTop: 20,
    marginBottom: Spacing/2,
    fontWeight: "500",
  },
  touchedText: {
    backgroundColor: Color.secondary,
  },
  touchedTextButton:{
    color: "#235784"
  },
  styleTextButton:{
    color: Color.secondary,
    fontSize: Spacing * 1.5,
    fontWeight: "500"
  },
  ButtonStyle:{
    marginLeft: Spacing*5,
    backgroundColor: Color.primary,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing * 2,
  }
});



