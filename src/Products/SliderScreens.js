import { StyleSheet, Text, View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import React from 'react'

const SliderScreens = () => {
        const slides = [
            require('../ProductImage/10.jpg'),
            require('../ProductImage/8.jpg'),
            require('../ProductImage/9.jpg'),   
        ]

    
  return (
<View style={styles.container}>
 <SliderBox images={slides}
  dotColor="#FFEE58"
  dotStyle={{
    width: 15,
    height: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 0,
    margin: 0,
  }}
  ImageComponentStyle={{
    borderRadius: 20,
    width: '100%',
    height: 300,
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 20,
}}
  autoplay
  circleLoop
/>
</View>
  )}


export default SliderScreens

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        borderRadius: 50,
    }
})