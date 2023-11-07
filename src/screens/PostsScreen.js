import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../Common/Color';
import Header from './Header.js';
import NavbarButtom from '../Common/NavbarButtom';
import { View, Text, FlatList, StyleSheet ,Image,TextInput} from 'react-native';

const mockPosts = [
    {
      id: 1,
      userName: 'Maymona',
      userImage: require('../../assets/userimage.jpg'),
      content: 'This is the body of Post 1',
      date: 'October 12, 2023',
    },
    {
      id: 2,
      userName: 'Nada',
      userImage: require('../../assets/userimage.jpg'),
      content: 'This is the body of Post 2',
      date: 'October 11, 2023',
    },
    {
      id: 3,
      userName: 'Ghadeer',
      userImage: require('../../assets/userimage.jpg'),
      content: 'This is the body of Post 3',
      date: 'October 10, 2023',
    },
    // Add more mock posts here
  ];

  const PostsScreen = () => {
    const [newPost, setNewPost] = useState(''); // State to hold the new post content
  
    const handlePost = () => {
      if (newPost) {
        // Handle posting the new content, e.g., send it to a server or update your local data
        mockPosts.unshift({
          id: mockPosts.length + 1,
          userName: 'Maymona',
          userImage: 'https://via.placeholder.com/100',
          content: newPost,
          date: 'Just now',
        });
        setNewPost(''); // Clear the input field
      }
    };
  
    return (
      <View style={styles.container}>
        <Header />
        {/* Text Input for Posting */}
        <View style={styles.postInputContainer}>
          <TextInput
            style={styles.postInput}
            placeholder="Share your thoughts..."
            value={newPost}
            onChangeText={(text) => setNewPost(text)}
          />
          <Icon
            name="send"
            size={30}
            color="#5e366a"
            onPress={handlePost}
          />
        </View>
  
        <FlatList
          data={mockPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <View style={styles.userContainer}>
                <Image source={ item.userImage } style={styles.userImage} />
                <Text style={styles.userName}>{item.userName}</Text>
              </View>
              <Text style={styles.postContent}>{item.content}</Text>
              <Text style={styles.postDate}>{item.date}</Text>
            </View>
          )}
        />
        <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)}/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    postContainer: {
      backgroundColor: '#ffffff',
      padding: 16,
      margin:10,
      borderRadius: 20,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 30,
      marginRight: 8,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    postContent: {
      fontSize: 16,
      marginTop: 10,
    },
    postDate: {
      fontSize: 12,
      color: '#777',
      marginTop: 10,
    },
    postInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    postInput: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 16,
      marginRight: 8,
    },
  });
  
  export default PostsScreen;