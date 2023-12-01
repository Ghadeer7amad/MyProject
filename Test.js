import React, { useState } from "react"; 
import { View, Text, Image, TouchableOpacity,  
    StyleSheet, Alert } from "react-native"; 
import * as ImagePicker from "expo-image-picker"; 
import * as FileSystem from 'expo-file-system';
  
export default function App() { 
  
    // Stores the selected image URI 
    const [file, setFile] = useState(null); 
  
    // Stores any error message 
    const [error, setError] = useState(null); 
  
    // Function to pick an image from  
    //the device's media library 
    const pickImage = async () => {
        try {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
          if (status !== "granted") {
            Alert.alert(
              "Permission Denied",
              "Sorry, we need camera roll permission to upload images."
            );
          } else {
            const result = await ImagePicker.launchImageLibraryAsync();
      
            if (!result.cancelled) {
              let localUri = result.uri;
      
              // Use Expo.FileSystem.getContentUriAsync to get a content URI
              const contentUri = await FileSystem.getContentUriAsync(localUri);
      
              // Set the content URI as the image URI
              setFile(contentUri);
              setError(null);
            } else {
              // Handle the case where the user cancels image selection
              setError("Image selection cancelled");
            }
          }
        } catch (error) {
          // Handle other errors that may occur during the process
          setError("Error picking image: " + error.message);
        }
      };
  
    return ( 
        <View style={styles.container}> 
            <Text style={styles.header}> 
                Add Image: 
            </Text> 
  
            {/* Button to choose an image */} 
            <TouchableOpacity style={styles.button} 
                onPress={pickImage}> 
                <Text style={styles.buttonText}> 
                    Choose Image 
                </Text> 
            </TouchableOpacity> 
  
            {/* Conditionally render the image  
            or error message */} 
            {file ? ( 
                // Display the selected image 
                <View style={styles.imageContainer}> 
                    <Image source={{ uri: file }} 
                        style={styles.image} /> 
                </View> 
            ) : ( 
                // Display an error message if there's  
                // an error or no image selected 
                <Text style={styles.errorText}>{error}</Text> 
            )} 
        </View> 
    ); 
} 
  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 16, 
    }, 
    header: { 
        fontSize: 20, 
        marginBottom: 16, 
    }, 
    button: { 
        backgroundColor: "#007AFF", 
        padding: 10, 
        borderRadius: 8, 
        marginBottom: 16, 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 4, 
        elevation: 5, 
    }, 
    buttonText: { 
        color: "#FFFFFF", 
        fontSize: 16, 
        fontWeight: "bold", 
    }, 
    imageContainer: { 
        borderRadius: 8, 
        marginBottom: 16, 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 4, 
        elevation: 5, 
    }, 
    image: { 
        width: 200, 
        height: 200, 
        borderRadius: 8, 
    }, 
    errorText: { 
        color: "red", 
        marginTop: 16, 
    }, 
});