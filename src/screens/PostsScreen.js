import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Color from "../Common/Color";
import Header from "./Header.js";
import NavbarButton from "../Common/NavbarButtom";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const mockPosts = [
  {
    id: 1,
    userName: "Maymona",
    userImage: require("../../assets/userimage.jpg"),
    content: "This is the body of Post 1",
    date: "October 12, 2023",
    likes: 5,
    comments: 3,
  },
  {
    id: 2,
    userName: "Nada",
    userImage: require("../../assets/userimage.jpg"),
    content: "This is the body of Post 2",
    date: "October 11, 2023",
    likes: 7,
    comments: 2,
  },
  {
    id: 3,
    userName: "Ghadeer",
    userImage: require("../../assets/userimage.jpg"),
    content: "This is the body of Post 3",
    date: "October 10, 2023",
    likes: 12,
    comments: 4,
  },
];

const PostsScreen = () => {
  const [newPost, setNewPost] = useState("");

  const handlePost = (type) => {
    if (type === "post") {
      if (newPost) {
        const newMockPost = {
          id: mockPosts.length + 1,
          userName: "Your Name",
          userImage: "https://via.placeholder.com/100",
          content: newPost,
          date: "Just now",
          likes: 0,
          comments: 0,
        };
        mockPosts.unshift(newMockPost);
        setNewPost("");
      }
    } else if (type === "image") {
      // Handle posting an image
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.postInputContainer}>
        <View style={styles.postingContainer}>
        <Image source={require("../../assets/aya5.jpg")} style={styles.userImage} />
        <View style={styles.postInputWrapper}>
          <TextInput
            style={styles.postInput}
            placeholder="What do you want to share?"
            value={newPost}
            onChangeText={(text) => setNewPost(text)}
            multiline
          />
        </View></View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handlePost("post")}
          >
            <View style={styles.optionsContainer}>
            <Icon name="create" size={25} color="#5e366a" />
            <Text style={styles.text} >Post</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handlePost("image")}
          >
            <View style={styles.optionsContainer}>
            <Icon name="image" size={25} color="#5e366a" />
            <Text style={styles.text}>Image</Text></View>
          </TouchableOpacity>
        </View>
      
      </View>

      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.userContainer}>
              <Image source={item.userImage} style={styles.userImage} />
              <View style={styles.postHeader}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.postDate}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
            
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
          </View>
        )}
      />

      <NavbarButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  postContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    margin: 10,
    marginBottom:5,
    borderRadius: 20,
    shadowColor:"#fff",
    
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 60,
    height: 50,
    borderRadius: 25,
    marginRight:10
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom:-5
  },
  postContent: {
    fontSize: 16,
    marginTop: 15,
    marginBottom:15
  },
  postDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
  },
  postInputContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 2,
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
    width: 290,
    borderColor: "gray",
    borderWidth:1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginLeft: -15,
  },
  postInputWrapper: {
    flex: 1,
    marginLeft: 10,
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
    fontSize:18,
    marginLeft:6,
    
  },
  postInteractions:{
    flexDirection:"row",
    gap:6
  },
  postHeader:{
    gap:1
  }

});

export default PostsScreen;
