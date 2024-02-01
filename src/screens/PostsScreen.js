import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "./Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import WhatsApp from "../Common/WhatsApp.js";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PostsScreen = () => {
  const navigation = useNavigation(); 
  const [t, i18n] = useTranslation();

  const { role, token } = useSelector((state) => state.user.userData);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedText, setEditedText] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedItemId, setEditedItemId] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likeStatus, setLikeStatus] = useState({});
  const [likeStatusColor, setLikeStatusColor] = useState({});


  const { id: userId, name: userName } = useSelector(
    (state) => state.user.userData
  );

  const { _id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );

  const baseUrl = "https://ayabeautyn.onrender.com";



  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/salons/${salonId}/Post/post`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nada__${token}`,
        },
      });
      const data = await response.json();
  
      if (Array.isArray(data)) {
        const formattedData = [];
        for (const item of data) {
          if (item && item.createdAt) {
            formattedData.push({
              ...item,
              timestamps: new Date(item.createdAt).toLocaleString(),
            });
          } else {
            console.error("Error fetching data: Invalid item format", item);
          }
        }
        setItems(formattedData);
        setIsLoading(false);
      } else {
        console.error("Error fetching data: Invalid data format", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  
  
  };
  

  //عشان يحافظ على لون اللايك
  const persistLikeStatus = async () => {
    try {
      await AsyncStorage.setItem("likeStatus", JSON.stringify(likeStatus));
    } catch (error) {
      console.error("Error storing likeStatus:", error);
    }
  };

  const retrieveLikeStatus = async () => {
    try {
      const storedLikeStatus = await AsyncStorage.getItem("likeStatus");
      if (storedLikeStatus !== null) {
        setLikeStatus(JSON.parse(storedLikeStatus));
      }
    } catch (error) {
      console.error("Error retrieving likeStatus:", error);
    }
  };

 

  

  const handleDeletePress = async (itemId) => {
    try {
      const response = await fetch(`${baseUrl}/posts/post/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nada__${token}`,
        },
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
      t("Confirm deletion"),
      t("Are you sure you want to delete this salon?"),
      [
        {
          text: t("Cancel"),
          style: "cancel",
        },
        {
          text: t("Yes, Delete"),
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
            Authorization: `Nada__${token}`,
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
          console.error(
            "Failed to update item. Server response:",
            responseData
          );
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
      return t("Just Now");
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days <= 2) {
      return `${days}d ago`;
    } else {
      return postDate.toLocaleDateString("en-GB");
    }
  };

  const handleToggleLike = async (itemId) => {
    try {
      const response = await fetch(`${baseUrl}/posts/post/${itemId}/${userId}`, {
        method: "POST",
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Update like status in AsyncStorage
        const updatedLikeStatus = { ...likeStatus, [itemId]: !likeStatus[itemId] };
        await AsyncStorage.setItem("likeStatus", JSON.stringify(updatedLikeStatus));
  
        // Update like status color
        const updatedLikeStatusColor = { ...likeStatusColor, [itemId]: 'red' };
        setLikeStatusColor(updatedLikeStatusColor);
  
        // Retrieve updated like status from AsyncStorage
        const storedLikeStatus = await AsyncStorage.getItem("likeStatus");
        if (storedLikeStatus !== null) {
          setLikeStatus(JSON.parse(storedLikeStatus));
  
          const updatedItems = items.map((item) => {
            if (item._id === itemId) {
              return {
                ...item,
                likes: new Array(responseData.likes),
              };
            }
            return item;
          });
  
          setItems(updatedItems);
        }
      } else {
        console.log("Error toggling like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  
  
  useEffect(() => {
    fetchData();
 
  }, []);

  //   retrieveLikeStatus();
  //persistLikeStatus();
  return (
    <MenuProvider>
      <View style={styles.container}>
        <WhatsApp />

        <Header />

        <View style={styles.postInputContainer}>
          {(role === "Admin" || role === "Manager") && (
            <View style={styles.postingContainer}>
              <View style={styles.postInputWrapper}>
                <Button
                  title={t("What do you want to share?")}
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
              {(role === "Admin" || role === "Manager") && (
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
                </Menu>
              )}

              <View style={styles.cardContentContainer}>
                <View style={styles.userInfoContainer}>
                  <Image
                    // source={{ uri: imageSalon.image }}
                    source={require("../../assets/profile.jpg")}
                    style={styles.smallUserImage}
                  />
                  <Text style={styles.userName}>{salonName}Center</Text>
                </View>

                <Text style={styles.postDate}>
                  {calculateTimeDifference(item.createdAt) ||
                    "No date available"}
                </Text>
                <Text  style={[styles.cardTitle, { writingDirection: i18n.language === 'ar' ? 'rtl' : 'ltr' }]}>{item.textPost}</Text>
                <Image
                  source={{ uri: item?.image?.secure_url }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.postInteractions}>
                <TouchableOpacity onPress={() => handleToggleLike(item._id)}>
                  <Icon
                    name="heart"
                    size={20}
                    color={likeStatusColor[item._id] || "#777"}
                  />
                </TouchableOpacity>
                <Text>{item.likes.length}</Text>
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
      placeholder="Edit your post..."
    />
    <Image
      source={{ uri: editedImage }}
      style={styles.editImage}
      resizeMode="cover"
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
    gap: 5,
    marginTop: 15,
    marginBottom: -5,
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
    marginTop: 5,
    

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
