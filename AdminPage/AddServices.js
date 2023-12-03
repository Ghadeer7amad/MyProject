import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native'
import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faFileSignature, faDollarSign, faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';
import Color from '../src/Common/Color.js';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AddServices = () => {
  const [FData, setFData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    time: "",
    subServices: "",
    status: "",
    image: "",
  });

  const [buttonText, setButtonText] = useState("Upload Image");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setButtonText("Image is uploaded successfully");
      setFData({ ...FData, image: result.assets[0].uri });
    }
  };


  const handleAddServices = async () => {
    try {
      const formData = new FormData();
      formData.append('name', FData.name);
      formData.append('description', FData.description);
      formData.append('price', FData.price);
      formData.append('discount', FData.discount);
      formData.append('time', FData.time);
      formData.append('subServices', FData.subServices);
      formData.append('status', FData.status);
      formData.append('image', { uri: FData.image.secure_url, name: 'image.jpg', type: 'image/jpg'});
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/services/CreateServices`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };
 const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={styles.contanier}>
      <Text style={styles.TextStyleHeader}>add Services</Text>

      <View style={styles.formgroup}>
        <TextInput
        value={FData.name}
        onChangeText={(text) => setFData({ ...FData, name: text })}
        style={styles.input} placeholder='Name Services'/>
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        
      </View>


      <View style={styles.formgroup}>
        <TextInput 
         value={FData.description}
         onChangeText={(text) => setFData({ ...FData, description: text })}
        style={[styles.input, styles.inputDis]} placeholder='Discrption Services'
        multiline={true} />
       <FontAwesomeIcon icon={faBook} style={[styles.icon, styles.iconDis]} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={FData.price}
        onChangeText={(text) => setFData({ ...FData, price: text })}
        style={styles.input} placeholder='Prise Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
         value={FData.discount}
         onChangeText={(text) => setFData({ ...FData, discount: text })}
        style={styles.input} placeholder='discount Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={FData.time}
        onChangeText={(text) => setFData({ ...FData, time: text })}
        style={styles.input} placeholder='time Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={FData.subServices}
        onChangeText={(text) => setFData({ ...FData, subServices: text })}
        style={styles.input} placeholder='subServices Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
         value={FData.status}
         onChangeText={(text) => setFData({ ...FData, status: text })}
        style={styles.input} placeholder='status Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>
      
    <View style={{marginHorizontal: 10, marginTop: 20}}>
      <Button title={buttonText}
       onPress={pickImage} 
       buttonStyle={{ backgroundColor: "transparent", width: "100%", height: 60, borderWidth: 2, borderColor: "#c3b4d2"}}
       titleStyle={{ color:"#757a79", fontSize: 15, marginLeft: 0 }} 
       />
        <FontAwesomeIcon icon={faCloudUploadAlt} style={[styles.icon, styles.iconDis]} />
        {image && image.assets && image.assets.length > 0 && <Image source={{ uri: image.assets[0].uri }} style={{ flex: 1 }} />}
    </View>

      <TouchableOpacity onPress={()=>handleAddServices()}>
       <Text style={styles.buttonStyle}>Publish Services</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
       <Text style={[styles.buttonStyle, styles.buttonStyle1]}>cancel</Text>
      </TouchableOpacity>  

    </View>
    </ScrollView>
  )
}

export default AddServices

const styles = StyleSheet.create({
  contanier:{
    width:"100%",
    height:"100%",
  },
  TextStyleHeader:{
    fontWeight:"500",
    color:Color.primary, 
    fontSize: 24,
    marginTop:70,
    marginBottom: 5,
    textAlign: "center",
    textTransform:"uppercase"
  },
  formgroup:{
    display:"flex",
    position:"relative",
    marginTop: 20,
    flexDirection: 'row',
    
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    color: Color.primary,
    marginHorizontal: 20,
    padding: 11,
  },
  input: {
    flex: 1, 
    borderBottomWidth: 1, 
    paddingVertical: 15, 
    padding: 50,
    marginHorizontal: 10,
    borderColor: "#c3b4d2",
    borderWidth: 2, 
  },
  inputDis:{
    paddingBottom: 100,
  },
  iconDis: {
    marginHorizontal: 20, 
    top: 20,
  },

  buttonStyle:{
    padding: 20,
    marginTop: 80,
    marginHorizontal: 10,
    backgroundColor: Color.primary,
    fontWeight: '400',
    fontSize: 19,
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign:"center",
    color:"#fff",
  },
  buttonStyle1: {
    backgroundColor: "transparent",
    color: Color.primary,
    marginTop: 10
  }
})



