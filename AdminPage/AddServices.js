import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native'
import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faFileSignature, faDollarSign, faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';
import Color from '../src/Common/Color.js';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AddServices = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [subServices, setsubServices] = useState("");
  const [time, settime] = useState("");
  const [image, setimage] = useState("");
  const [discount, setdiscount] = useState("");
  const [status, setstatus] = useState("");

  const onChangenameHandler = (name) => {
    setname(name);
  };
  const onChangedescriptionHandler = (description) => {
    setdescription(description);
  };
  const onChangepriceHandler = (price) => {
    setprice(price);
  };
  const onChangesubServicesHandler = (subServices) => {
    setsubServices(subServices);
  };
  const onChangetimeHandler = (time) => {
    settime(time);
  };
  const onChangeimageHandler = (image) => {
    setimage(image);
  };
  const onChangediscountHandler = (discount) => {
    setdiscount(discount);
  };
  const onChangestatusHandler = (status) => {
    setstatus(status);
  };

  const handleAddServices = async () => {
    const baseUrl = 'https://ayabeautyn.onrender.com';
    try {
      const response = await axios.post(`${baseUrl}/services/CreateServices`, {
        name, description, price, subServices, time, image, discount, status
      });
  
      if (response.status === 201) {
        alert(` You have added the service successfully: ${JSON.stringify(response.data)}`);
        setname("");
        setdescription("");
        setprice("");
        setdiscount("");
        setsubServices("");
        setdiscount("");
        setImage("");
        setstatus("");
        settime("");
        navigation.navigate('SalonScreen'); 
      } else {
        console.error('Error:', error.response.status, error.response.data);
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  };
 const navigation = useNavigation();
 /*const SubCategory = [
  { label: 'Face', value: 'Face' },
  { label: 'Body', value: 'Body' },
];
const [selectedSubCategory, setSelectedSubCategory] = useState(-1);*/

const [buttonText, setButtonText] = useState(" Upload Image                                             ");
const [Image, setImage] = useState(null);  
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log(result);

  if (!result.canceled) {
    setImage(result.uri); 
    alert("Chose Photo Done") 
    setButtonText("Services Image is uploaded successfully");
  }
};
  return (
    <ScrollView>
    <View style={styles.contanier}>
      <Text style={styles.TextStyleHeader}>add Services</Text>

      <View style={styles.formgroup}>
        <TextInput
        value={name}
        onChangeText={onChangenameHandler}
        style={styles.input} placeholder='Name Services'/>
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        
      </View>


      <View style={styles.formgroup}>
        <TextInput 
        value={description}
        onChangeText={onChangedescriptionHandler}
        style={[styles.input, styles.inputDis]} placeholder='Discrption Services'
        multiline={true} />
       <FontAwesomeIcon icon={faBook} style={[styles.icon, styles.iconDis]} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={price}
        onChangeText={onChangepriceHandler}
        style={styles.input} placeholder='Prise Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={discount}
        onChangeText={onChangediscountHandler}
        style={styles.input} placeholder='discount Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={time}
        onChangeText={onChangetimeHandler}
        style={styles.input} placeholder='time Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={subServices}
        onChangeText={onChangesubServicesHandler}
        style={styles.input} placeholder='subServices Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={status}
        onChangeText={onChangestatusHandler}
        style={styles.input} placeholder='status Services'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>
      
    <View style={{marginHorizontal: 10, marginTop: 20}}>
      <Button title={buttonText}
       onPress={() => pickImage()}  
       buttonStyle={{ backgroundColor: "transparent", width: "100%", height: 60, borderWidth: 2, borderColor: "#c3b4d2"}}
       titleStyle={{ color:"#757a79", fontSize: 15, marginLeft: 0 }} 
       />
        <FontAwesomeIcon icon={faCloudUploadAlt} style={[styles.icon, styles.iconDis]} />
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
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



