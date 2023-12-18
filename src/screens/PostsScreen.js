import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import Header from "./Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Modal from 'react-native-modal';
import * as ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Color from "../Common/Color.js";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


const PostsScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const baseUrl = "https://ayabeautyn.onrender.com";
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts/post`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        timestamps: new Date(item.createdAt).toLocaleString(),
      }));
      setItems(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeletePress = async (itemId) => {
    console.log('Deleting item with ID:', itemId);

    try {
      const response = await fetch(`${baseUrl}/posts/post/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        const responseData = await response.json();
        console.error('Failed to delete item. Server response:', responseData);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [editedItemId, setEditedItemId] = useState(null);

  const handleEditPress = (itemId, currentText) => {
    setEditedItemId(itemId);
    setEditedText(currentText);
    setEditedImage(items.find(item => item._id === itemId)?.image?.secure_url || '');
    setEditModalVisible(true);
  };

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.uri) {
        handleImageSelected(response.uri);
      }
    });
  };

  const handleImageSelected = (selectedImage) => {
    setEditedImage(selectedImage);
  };

  const handleImageUpload = async () => {
    console.log('Image uploaded:', editedImage);
  
    // Check if there is an image to upload
    if (!editedImage) {
      console.log('No image to upload');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: editedImage,
        type: 'image/jpeg', // Adjust the type according to your image format
        name: 'image.jpg',
      });
  
      const response = await fetch(`${baseUrl}/upload/image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any additional headers if needed
        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Image upload successful. Server response:', responseData);
  
        // If the server returns the image URL, you can use it for further processing
        const imageUrl = responseData.imageUrl;
        // Do something with the imageUrl if needed
      } else {
        const errorData = await response.json();
        console.error('Failed to upload image. Server response:', errorData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts/post/${editedItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textPost: editedText,
          image: editedImage,
        }),
      });

      if (response.ok) {
        const updatedItems = items.map(item => {
          if (item._id === editedItemId) {
            return {
              ...item,
              textPost: editedText,
              image: editedImage,
            };
          }
          return item;
        });

        setItems(updatedItems);
        setEditModalVisible(false);
      } else {
        const responseData = await response.json();
        console.error('Failed to update item. Server response:', responseData);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = now - postDate;
  
    // Calculate time difference in seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes === 0) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days <= 2) {
      return `${days}d`;
    } else {
      // Format the postDate using toLocaleDateString() with the desired options
      return postDate.toLocaleDateString('en-GB'); // Adjust the locale as needed
    }
  };
  
  
  
  

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <MenuProvider>
    <View style={styles.container}>
      <Header />

      <View style={styles.postInputContainer}>
        <View style={styles.postingContainer}>
          <Image source={require("../../assets/3.jpg")} style={styles.userImage} />
          <View style={styles.postInputWrapper}>
            <Button
              title="What do you want to share?"
              type="outline"
              onPress={() => navigation.navigate("AddPost")}
              buttonStyle={styles.postButton}
              titleStyle={styles.postButtonTitle}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            <Menu>
              <MenuTrigger>
                <Icon name="ellipsis-vertical" color="#5e366a" size={20} />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleDeletePress(item._id)} text="Delete" />
                <MenuOption onSelect={() => handleEditPress(item._id, item.textPost)} text="Edit" />
              </MenuOptions>
            </Menu>
            <View style={styles.cardContentContainer}>
              <Text style={styles.postDate}>
                {calculateTimeDifference(item.createdAt) || 'No date available'}
              </Text>
              <Text style={styles.cardTitle}>{item.textPost}</Text>
              <Image
                source={{ uri: item?.image?.secure_url }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.postInteractions}>
              <TouchableOpacity>
                <Icon name="heart" size={20} color="#ff4d4d" />
              </TouchableOpacity>
              <Text>{item.likes}</Text>
              <TouchableOpacity>
                <Icon name="chatbox" size={20} color="#777" />
              </TouchableOpacity>
              <Text>{item.comments}</Text>
            </View>
          </Card>
        )}
      />

      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />

      <Modal isVisible={isEditModalVisible}>
        <View style={styles.editModalContainer}>
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={(text) => setEditedText(text)}
          />
          <Image
            source={{ uri: editedImage }}
            style={styles.editImage}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={handleChooseImage}>
            <Text style={styles.editImagePicker}>Choose Image</Text>
          </TouchableOpacity>
          <View style={styles.editModalButtons}>
            <Button title="Save" onPress={handleSaveEdit} />
            <Button title="Cancel" onPress={handleCancelEdit} />
          </View>
        </View>
      </Modal>
    </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  postContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginHorizontal: 10,
    marginBottom:10,
    borderRadius: 20,
    shadowColor:"#fff",
    borderWidth: 0.8,
    borderColor: "gray",   
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 35,
    height: 50,
    borderRadius: 25,
    marginRight:10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom:-5,
  },
  postContent: {
    fontSize: 16,
    marginTop: 15,
    marginBottom:15,
  },
 
  postInputContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
  },
  postingContainer:{
    flexDirection: "row",
    alignItems: "center",
  },
  postInput: {
    flex: 1,
    height: 40,
    width: 300,
    borderColor: Color.background,
    borderWidth:1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  
  optionsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  optionButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#fff",
    fontSize:25,
  },
  text:{
    fontSize:16,
    marginLeft:6,
  },
  postInteractions:{
    flexDirection:"row",
    gap:6
  },
  postHeader:{
    gap:1,
  },
  icon: {
    position: 'absolute',
    backgroundColor:"#caabd8",
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
    marginLeft: 270,
    padding: 17,
  },

  buttonStyle: {
    width:"30%",
    padding: 10,
    marginHorizontal: 250,
    backgroundColor: Color.primary,
    fontWeight: "400",
    fontSize: 15,
    letterSpacing: 2,
    textAlign: "center",
    color: "#fff",
  },
 
  card: {
    borderRadius: 30,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
    position: 'relative',
  },
  cardTitle: {
    color: "#4c4c4c",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
    fontWeight: "800",
    textAlign: "left",
    
  },
  cardImage: {
    width: '100%',
    height: 300, // ارتفاع الصورة الثابت داخل الكارت
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  postInputWrapper: {
    flex: 1,
    marginLeft: 10,
    
  },
  postButton: {
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    borderColor: Color.primary,
  },
  postButtonTitle: {
    color: "black",
  },
  postDate: {
    fontSize: 12,
    color: "black",
    marginBottom: 5,
    marginLeft: 20,
  },
  editModalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  editModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editImage: {
    width: '100%',
    height: 150, // ارتفاع الصورة الثابت داخل الكارت
    borderRadius: 8,
    marginVertical: 10,
  },
  editImagePicker: {
    color: 'blue',
    marginVertical: 10,
  },
  
});

export default PostsScreen;
