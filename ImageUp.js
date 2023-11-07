import { StyleSheet,Image, Button, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const ImageUp = () => {
        const [image, setImage] = useState(null);
        const pickImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImage(result.uri); 
          }
        };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={() => pickImage() } />
      {image && <Image source={{ uri: image }} style={{flex: 1}} />} 
    </View>
  )
}

export default ImageUp

const styles = StyleSheet.create({

})