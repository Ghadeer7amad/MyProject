import { StyleSheet, Text, View,TextInput, Image, TouchableOpacity, SafeAreaView} from 'react-native'
import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faFileSignature, faDollarSign, faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';
import Color from '../src/Common/Color.js';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {
  const[FData, setFData] = useState({
    name: "",
    discrption: "",
    prise: "",
    subCategory: "",
    image: ""
  })
 const navigation = useNavigation();
 const SubCategory = [
  { label: 'Face', value: 'Face' },
  { label: 'Body', value: 'Body' },
];
const [selectedSubCategory, setSelectedSubCategory] = useState(-1);

const [buttonText, setButtonText] = useState(" Upload Image                                             ");
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
    alert("Chose Photo Done") 
    setButtonText("Product Image is uploaded successfully");
  }
};

  return (
    <View style={styles.contanier}>
      <Text style={styles.TextStyleHeader}>add product</Text>

      <View style={styles.formgroup}>
        <TextInput
        value={FData.name}
        onChangeText={(text) => setFData({...FData, name: text})}
        style={styles.input} placeholder='Name Product'/>
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        
      </View>


      <View style={styles.formgroup}>
        <TextInput 
        value={FData.discrption}
        onChangeText={(text) => setFData({...FData, discrption: text})} 
        style={[styles.input, styles.inputDis]} placeholder='Discrption Product'
        multiline={true} />
       <FontAwesomeIcon icon={faBook} style={[styles.icon, styles.iconDis]} />
      </View>

      <View style={styles.formgroup}>
        <TextInput 
        value={FData.prise}
        onChangeText={(text) => setFData({...FData, prise: text})} 
        style={styles.input} placeholder='Prise Product'/>
       <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
      </View>

      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: "#c3b4d2",
       marginHorizontal: 10, marginTop: 20 }}>
      <RNPickerSelect
        items={SubCategory}
        onValueChange={(value) => setSelectedSubCategory(value)}
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
        placeholder={{ label: 'Chose Subcategor', value: null}}
        value={selectedSubCategory}
      />
    </SafeAreaView>
   
    <View style={{marginHorizontal: 10, marginTop: 20}}>
      <Button title={buttonText}
       onPress={() => pickImage()}  
       buttonStyle={{ backgroundColor: "transparent", width: "100%", height: 60, borderWidth: 2, borderColor: "#c3b4d2"}}
       titleStyle={{ color:"#757a79", fontSize: 15, marginLeft: 0 }} 
       />
        <FontAwesomeIcon icon={faCloudUploadAlt} style={[styles.icon, styles.iconDis]} />
      {image && <Image source={{ uri: image }} style={{flex: 1}} />} 
    </View>

      <TouchableOpacity onPress={()=>navigation.navigate('AddServices')}>
       <Text style={styles.buttonStyle}>Publish Product</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
       <Text style={[styles.buttonStyle, styles.buttonStyle1]}>cancel</Text>
      </TouchableOpacity>  

    </View>
  )
}

export default AddProduct

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