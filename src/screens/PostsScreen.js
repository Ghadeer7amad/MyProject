import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "./Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
} from "react-native";
import Color from "../Common/Color.js";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useSelector } from "react-redux";


const PostsScreen = () => {
  const navigation = useNavigation();
  const { role } = useSelector((state) => state.user.userData);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedText, setEditedText] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedItemId, setEditedItemId] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likeStatus, setLikeStatus] = useState({});

  const {
    id: userId,
    name: userName,
  } = useSelector((state) => state.user.userData);

  const {id: salonId , name: salonName, image: imageSalon} = useSelector(state => state.user.usedSalonData)


  const baseUrl = "https://ayabeautyn.onrender.com";

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Gallery Permission",
          message: "App needs access to your gallery to choose images.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Gallery permission granted");
      } else {
        console.log("Gallery permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts/post`);
      const data = await response.json();
      const formattedData = data.map((item) => ({
        ...item,
        timestamps: new Date(item.createdAt).toLocaleString(),
      }));
      setItems(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeletePress = async (itemId) => {
    console.log("Deleting item with ID:", itemId);

    try {
      const response = await fetch(`${baseUrl}/posts/post/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        const responseData = await response.json();
        console.error("Failed to delete item. Server response:", responseData);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: () => handleDeletePress(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleEditPress = (itemId, currentText, currentImage) => {
    setEditedItemId(itemId);
    setEditedText(currentText);
    setEditedImage(currentImage);
    setEditModalVisible(true);
  };

 

 

  const handleSaveEdit = async () => {
    try {
      if (editedItemId) {
        const newText = editedText || null;
  
        const response = await fetch(`${baseUrl}/posts/post/${editedItemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            textPost: newText,
          }),
        });
  
        if (response.ok) {
          const updatedItems = items.map((item) => {
            if (item._id === editedItemId) {
              return {
                ...item,
                textPost: newText || item.textPost,
              };
            }
            return item;
          });
  
          setItems(updatedItems);
          setEditModalVisible(false);
  
          // Call fetchData after successfully updating the post
          fetchData();
        } else {
          const responseData = await response.json();
          console.error("Failed to update item. Server response:", responseData);
        }
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = now - postDate;
  
    if (timeDifference < 60000) {
      return "Just Now";
    }
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days <= 2) {
      return `${days}d`;
    } else {
      return postDate.toLocaleDateString("en-GB");
    }
  };
  

  useEffect(() => {
    requestGalleryPermission();
    fetchData();
  
    const userLoggedInStatus = 
    setIsLoggedIn(userLoggedInStatus);
  
    setLikeStatus({});
  }, [isLoggedIn]);

  

  const handleToggleLike = async (itemId) => {
    try {
      const response = await fetch(`${baseUrl}/posts/post/${itemId}/like`, {
        method: "POST", 
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedItems = items.map((item) => {
          if (item._id === itemId) {
            return {
              ...item,
              likes: responseData.likes,
            };
          }
          return item;
        });
        setItems(updatedItems);

        setLikeStatus((prevStatus) => ({
          ...prevStatus,
          [itemId]: true,
        }));
      } else {
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleUnlike = async (itemId) => {
    try {
      const response = await fetch(`${baseUrl}/posts/post/${itemId}/unlike`, {
        method: "POST",
      });

      if (response.ok) {
        const responseData = await response.json();

        const updatedItems = items.map((item) => {
          if (item._id === itemId) {
            return {
              ...item,
              likes: responseData.likes,
            };
          }
          return item;
        });

        setItems(updatedItems);

        setLikeStatus((prevStatus) => ({
          ...prevStatus,
          [itemId]: false,
        }));
      } else {
        console.error(
          "Failed to unlike. Server response:",
          response.statusText
        );

        const responseText = await response.text();
        console.log("HTML error page:", responseText);

      }
    } catch (error) {
      console.error("Error handling unlike:", error);
    }
  };






  return (
    <MenuProvider>
      <View style={styles.container}>
        <Header />

        <View style={styles.postInputContainer}>
        {role === "Admin" && (
          <View style={styles.postingContainer}>
            <Image
              source={require("../../assets/3.jpg")}
              style={styles.userImage}
            />
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
        )}
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card containerStyle={styles.card}>
              {role === "Admin" && (
              <Menu>
                <MenuTrigger style={styles.pointsContainer}>
                  <Icon name="ellipsis-vertical" color="#5e366a" size={20} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    onSelect={() => confirmDelete(item._id)}
                    text="Delete"
                  />
                  <MenuOption
                    onSelect={() =>
                      handleEditPress(
                        item._id,
                        item.textPost,
                        item?.image?.secure_url || ""
                      )
                    }
                    text="Edit"
                  />
                </MenuOptions>
              </Menu> )}

              <View style={styles.cardContentContainer}>
                {/* New section for the small circular image and name */}
                <View style={styles.userInfoContainer}>
                  <Image
                    // source={{ uri: imageSalon.image }}
                    source={require("../../assets/3.jpg")}
                    style={styles.smallUserImage}
                  />
                  <Text style={styles.userName}>{salonName}</Text>
                </View>

                <Text style={styles.postDate}>
                  {calculateTimeDifference(item.createdAt) ||
                    "No date available"}
                </Text>
                <Text style={styles.cardTitle}>{item.textPost}</Text>
                <Image
                  source={{ uri: item?.image?.secure_url }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.postInteractions}>
                <TouchableOpacity
                  onPress={() => {
                    if (likeStatus[item._id]) {
                      handleUnlike(item._id);
                    } else {
                      handleToggleLike(item._id);
                    }
                  }}
                >
                  <Icon
                    name="heart"
                    size={20}
                    color={likeStatus[item._id] ? "red" : "#777"}
                  />
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

            <View style={styles.editModalButtons}>
              <Button
                title="Save"
                onPress={handleSaveEdit}
                buttonStyle={styles.saveButton}
              />
              <Button
                title="Cancel"
                onPress={handleCancelEdit}
                buttonStyle={styles.cancelButton}
              />
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
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "#fff",
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
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: -5,
  },
  postContent: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
  },

  postInputContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
  },
  postingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postInput: {
    flex: 1,
    height: 40,
    width: 300,
    borderColor: Color.background,
    borderWidth: 1,
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
    fontSize: 25,
  },
  text: {
    fontSize: 16,
    marginLeft: 6,
  },
  postInteractions: {
    flexDirection: "row",
    gap: 6,
  },
  postHeader: {
    gap: 1,
  },
  icon: {
    position: "absolute",
    backgroundColor: "#caabd8",
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
    marginLeft: 270,
    padding: 17,
  },

  buttonStyle: {
    width: "30%",
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
    position: "relative",
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
    width: "100%",
    height: 300, // ارتفاع الصورة الثابت داخل الكارت
    resizeMode: "cover",
    borderRadius: 20,
  },
  cardContentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
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
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  editModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editImage: {
    width: "100%",
    height: 300, // ارتفاع الصورة الثابت داخل الكارت
    borderRadius: 8,
    marginVertical: 10,
  },
  editImagePicker: {
    color: Color.primary,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: Color.background,
    borderRadius: 10,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: Color.background,
    borderRadius: 10,
    padding: 10,
  },

  pointsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallUserImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 5,
  },
  userName: {
    fontSize: 12,
    color: "black",
  },
});

export default PostsScreen;
