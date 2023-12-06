import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native'
import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faFileSignature, faDollarSign, faCloudUploadAlt, faClock} from '@fortawesome/free-solid-svg-icons';
import Color from '../src/Common/Color.js';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { serialize } from "object-to-formdata";
import { Box, useToast } from "native-base";
import RNPickerSelect from 'react-native-picker-select';

const AddServices = ({route}) => {
  const subServices = [
    { label: 'Face', value: 'Face' },
    { label: 'Body', value: 'Body' },
  ];
  const status = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];
  const [FData, setFData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    time: "",
    subServices: [],
    status: [],
    image: "",
  });
  const toast = useToast();
  const [buttonText, setButtonText] = useState("Upload Image");
  const [image, setImage] = useState(null);

  const handleSubServicesChange = (selectedsubServices) => {
    setFData((prevData) => ({
      ...prevData,
      subServices: selectedsubServices
    }));
  };

  const handleStautsChange = (selectedStauts) => {
    setFData((prevData) => ({
      ...prevData,
      status: selectedStauts
    }));
  };
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
      setButtonText("Image is uploaded successfully");
    }
  };


  const handleAddServices = async () => {
    try {
      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
        noFilesWithArrayNotation: false,
        dotsForObjectNotation: true,
      };

      const formData = serialize(FData, options);

      formData.append("image", {
        uri: image.uri,
        name: FData.name + ".jpg",
        type: "image/jpeg",
        size: image.fileSize,
      });
      const baseUrl = "https://ayabeautyn.onrender.com";

      const response = await fetch(`${baseUrl}/services/CreateServices`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.error('Error during fetch:', response.status, responseData);
        toast.show({
            render: () => (
                <Box bg="red.500" px="5" py="5" rounded="sm" mb={5}>
                    Error adding services: {responseData.message}
                </Box>
            ),
        });
        return;
    }
    console.log('Request successful:', responseData);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
              Services added successfully
            </Box>
          );
        },
      }); 
      setFData({
        name: "",
        description: "",
        price: "",
        discount: "",
        time: "",
        subServices: "",
        status: "",
        image: "",
    });
    setImage(null);
    setButtonText("Upload Image");
    
    } catch (error) {
      console.error('Error during fetch:', error);
      // Show an error message to the user
      toast.show({
          render: () => (
              <Box bg="red.500" px="5" py="5" rounded="sm" mb={5}>
                  Error adding services
              </Box>
          ),
      });
    }
  };

  /*const handleEditService = async (itemId) => {
    try {
      if (!image || !image.uri) {
        console.error('Error: Image is null or does not have a uri property.');
        return;
      }
      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
        noFilesWithArrayNotation: false,
        dotsForObjectNotation: true,
      };
      const formData = serialize(FData, options);
      formData.append("image", {
        uri: image.uri,
        name: FData.name + ".jpg",
        type: "image/jpeg",
        size: image.fileSize,
      });
      const baseUrl = "https://ayabeautyn.onrender.com";
  
      const response = await fetch(`${baseUrl}/services/updateServices/${itemId}`, {
        method: "PUT",
        body: formData,
      });
  
      const responseData = await response.json();
      if (!response.ok) {
        console.error('Error during fetch:', response.status, responseData);
        toast.show({
          render: () => (
            <Box bg="red.500" px="5" py="5" rounded="sm" mb={5}>
              Error updating services: {responseData.message}
            </Box>
          ),
        });
        return;
      }
  
      console.log('Request successful:', responseData);
      toast.show({
        render: () => (
          <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
            Services updated successfully
          </Box>
        ),
      }); 
  
      setFData({
        name: "",
        description: "",
        price: "",
        discount: "",
        time: "",
        subServices: "",
        status: "",
        image: "",
      });
      setImage(null);
      setButtonText("Upload Image");
  
    } catch (error) {
      console.error('Error during fetch:', error);
      toast.show({
        render: () => (
          <Box bg="red.500" px="5" py="5" rounded="sm" mb={5}>
            Error updating services
          </Box>
        ),
      });
    }
  };*/
  
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
       <FontAwesomeIcon icon={faClock} style={styles.icon} />
      </View>

      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: "#c3b4d2",
       marginHorizontal: 10, marginTop: 20 }}>
      <RNPickerSelect
        items={subServices}
        onValueChange={(value) => handleSubServicesChange(value)}
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 14,
            paddingHorizontal: 10,
            width: 200,
          },
          placeholder: {
            color: "#757a79",
          }
        }} 
        placeholder={{ label: 'Chose SubServices', value: null}}
        value={FData.subServices}
      />
      </SafeAreaView>

      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: "#c3b4d2",
       marginHorizontal: 10, marginTop: 20 }}>
      <RNPickerSelect
        items={status}
        onValueChange={(value) => handleStautsChange(value)}
        style={{
          inputIOS: {
            paddingVertical: 20,
            paddingHorizontal: 10,
            width: 200,
          },
          placeholder: {
            color: "#757a79",
          }
        }} 
        placeholder={{ label: 'Stauts Services', value: null}}
        value={FData.status}
      />
      </SafeAreaView>
      
      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <Button
          title={buttonText}
          onPress={pickImage}
          buttonStyle={{
            backgroundColor: "transparent",
            width: "100%",
            height: 60,
            borderWidth: 2,
            borderColor: "#c3b4d2",
          }}
          titleStyle={{ color: "#757a79", fontSize: 15, marginLeft: 0 }}
        />
        <FontAwesomeIcon
          icon={faCloudUploadAlt}
          style={[styles.icon, styles.iconDis]}
        />
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{
              width: 335,
              height: 180,
              margin: 20,
              borderRadius: 10,
              marginLeft: 15,
            }}
          />
        )}
      </View>

      <TouchableOpacity onPress={()=>handleAddServices()}>
       <Text style={styles.buttonStyle}>Publish Services</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={()=>handleEditService()}>
       <Text style={styles.buttonStyle}>Edit Services</Text>
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



