import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
//import * as DocumentPicker from 'react-native-document-picker';

import Color from '../Common/Color';

const Jobs = () => {
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === 'success') {
        setSelectedFile(result.name);
        // You can handle the selected file here
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/job.jpg')}
        style={styles.imageStyle}
        resizeMode="cover"
      />

      <Text style={styles.labelStyle}>Type of The Job:</Text>

      <View style={styles.labeledContainerStyle}>
        <Text style={styles.labeledTextStyle}>Laser Specialist</Text>
      </View>

      <Text style={[styles.labelStyle, { marginTop: 20 }]}>Description:</Text>

      <View style={[styles.labeledContainerStyle, { height: 120 }]}>
        <Text style={styles.labeledTextStyle}>
          A laser specialist performs work from 9 am to 4 pm and receives a salary of $1000 per month. Only Friday is a day off.
        </Text>
      </View>

      <Text style={[styles.labelStyle, { marginTop: 20 }]}>Attach your CV:</Text>


      <TouchableOpacity onPress={handleFilePick} style={styles.fileUploadButton}>
        <Text style={styles.fileUploadText}>Upload File</Text>
      </TouchableOpacity>

      {/* Display selected file */}
      {selectedFile && (
        <Text style={styles.selectedFileText}>{`Selected File: ${selectedFile}`}</Text>
      )}

      {/* Additional information for file upload */}
      <Text style={styles.uploadInfoText}>
        Upload your CV by tapping the "Upload File" button.
      </Text>
     

      {/* Submit Form button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.buttonStyle}><Ionicons name="paper-plane" size={25} color="#ebebeb" />  Submit Form</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: '100%',
    height: 350,
  },
  labelStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    color: Color.primary,
  },
  labeledContainerStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5, // For Android
  },
  labeledTextStyle: {
    fontSize: 17,
    color: 'gray',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonStyle: {
    padding: 15,
    marginTop: 10,
    marginHorizontal: 100,
    fontWeight: '400',
    fontSize: 20,
    textAlign: "center",
    color: "#ebebeb",
    backgroundColor: Color.primary,
    borderRadius: 5,
  },


  fileUploadButton: {
    backgroundColor: Color.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 370,
    alignSelf: 'center',
    
  },
  fileUploadText: {
    color: '#ebebeb',
    fontSize: 16,
  },
  selectedFileText: {
    color: 'gray',
    marginTop: 10,
  },
  uploadInfoText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    color: 'gray',
  },
});
