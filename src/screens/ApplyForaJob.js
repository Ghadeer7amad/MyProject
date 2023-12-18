import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import Spacing from '../Common/Spacing.js';
import { Picker } from '@react-native-picker/picker';
//import * as DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker

import Color from '../Common/Color';

const ApplyForaJob = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedJob, setSelectedJob] = useState('Laser Specialist'); // State for selected job type

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(result.name);
      // Handle the selected file here
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // File selection was cancelled
      } else {
        throw err;
      }
    }
  };

  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

 
  const baseUrl = "https://ayabeautyn.onrender.com";
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/jobs/job`);
      const data = await response.json();
      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ImageBackground source={require('../../assets/11.jpg')} style={styles.container}>
      <TouchableOpacity style={{ marginLeft: Spacing * 2, marginTop: Spacing * 3 }}
        onPress={() => {
          navigation.navigate('MainJob');
        }}>
        <Ionicons name="arrow-back" color={Color.primary} size={Spacing * 2} />
      </TouchableOpacity>
      
      <View style={{ flex: 1, justifyContent: 'center', marginTop: -200 }}>
        <Text style={styles.labelStyle}>Choose The Job:</Text>

        <View style={styles.labeledContainerStyle}>
        <Picker
  selectedValue={selectedJob}
  onValueChange={(itemValue, itemIndex) => setSelectedJob(itemValue)}
  style={styles.pickerStyle}
>
  {items.map((item) => (
    <Picker.Item key={item.id} label={item.jobName} value={item.jobName} />
  ))}
</Picker>


        </View>

        <Text style={[styles.labelStyle, { marginTop: 20 }]}>Attach your CV:</Text>

        <TouchableOpacity onPress={handleFilePick} style={styles.fileUploadButton}>
          <Text style={styles.fileUploadText}>Upload File</Text>
        </TouchableOpacity>

        {selectedFile && (
          <Text style={styles.selectedFileText}>{`Selected File: ${selectedFile}`}</Text>
        )}

        <Text style={styles.uploadInfoText}>
          Upload your CV by tapping the "Upload File" button.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.buttonStyle}><Ionicons name="paper-plane" size={25} color="#ebebeb" />  Submit Form</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
  },
  labeledContainerStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5, 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
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
    backgroundColor: Color.background,
    borderRadius: 5,
  },
  fileUploadButton: {
    backgroundColor: Color.background,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 370,
    height: 60,
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
  pickerStyle: {
    height: 50,
    width: '100%',
    color: 'gray',
  },
});

export default ApplyForaJob;
