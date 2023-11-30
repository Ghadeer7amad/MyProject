import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity, SafeAreaView} from 'react-native'
import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faFileSignature, faDollarSign, faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';
import Color from '../src/Common/Color.js';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/Ionicons";



const AddEmployee = () => {
    const [FData, setFData] = useState({
      name: "",
      job: "",
      experienceYears: "",
      image: ""
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
  
      if (!result.cancelled) {
        setImage(result.uri);
        setButtonText("Image is uploaded successfully");
        setFData({ ...FData, image: result.uri });
      }
    };
  
    const addEmployee = async () => {
        try {
          const formData = new FormData();
          formData.append('name', FData.name);
          formData.append('job', FData.job);
          formData.append('experienceYears', FData.experienceYears);
          formData.append('image', { uri: FData.image.secure_url, name: 'image.jpg', type: 'image/jpg' });
      
          const response = await fetch('http://10.0.2.2:3000/employees/employee', {
            method: 'POST',
            body: formData,
          });
      
          // Assuming your server returns JSON, you can parse the response like this:
          const responseData = await response.json();
      
          console.log(responseData);
        } catch (error) {
          console.error(error);
        }
      };
    return (
      <View style={styles.container}>
        <Text style={styles.TextStyleHeader}>Add Employee</Text>
  
        <View style={styles.formgroup}>
          <TextInput
            value={FData.name}
            onChangeText={(text) => setFData({ ...FData, name: text })}
            style={styles.input}
            placeholder='Employee Name'
          />
          <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        </View>
  
        <View style={styles.formgroup}>
          <TextInput
            value={FData.job}
            onChangeText={(text) => setFData({ ...FData, job: text })}
            style={styles.input}
            placeholder='Employee Job'
          />
          <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        </View>
  
        <View style={styles.formgroup}>
          <TextInput
            value={FData.experienceYears}
            onChangeText={(text) => setFData({ ...FData, experienceYears: text })}
            style={styles.input}
            placeholder='Years of experience'
          />
          <Icon name="checkmark-circle" size={22} style={styles.icon} />
        </View>
  
        <View style={{ marginHorizontal: 10, marginTop: 20 }}>
          <Button
            title={buttonText}
            onPress={pickImage}
            buttonStyle={{
              backgroundColor: "transparent",
              width: "100%",
              height: 60,
              borderWidth: 2,
              borderColor: "#c3b4d2"
            }}
            titleStyle={{ color: "#757a79", fontSize: 15, marginLeft: 0 }}
          />
          <FontAwesomeIcon icon={faCloudUploadAlt} style={[styles.icon, styles.iconDis]} />
          {image && <Image source={{ uri: image }} style={{flex: 1}} />} 

        </View>
  
        <TouchableOpacity onPress={addEmployee}>
          <Text style={styles.buttonStyle}>Add Employee</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.buttonStyle, styles.buttonStyle1]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default AddEmployee;

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