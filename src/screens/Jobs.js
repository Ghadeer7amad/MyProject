import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Button } from "react-native-elements";
import { FontAwesome as Icon } from "@expo/vector-icons";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import { Ionicons } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";

const Jobs = () => {
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
      console.error("Error fetching data:", error);
    }
  };

  const handleDeletePress = async (itemId) => {
    console.log("Deleting item with ID:", itemId);

    try {
      const response = await fetch(`${baseUrl}/jobs/job/${itemId}`, {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginLeft: Spacing * 2, marginTop: Spacing * 3 }}
        onPress={() => {
          navigation.navigate("MainJob");
        }}
      >
        <Ionicons name="arrow-back" color={Color.primary} size={Spacing * 2} />
      </TouchableOpacity>

      <View style={styles.container1}></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.textHeader}>Here are the jobs</Text>
        <Text style={styles.textHeader1}>we currently have available</Text>

        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <>
              <Card containerStyle={styles.card}>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDeletePress(item._id)}
                >
                  <Icon name="close" color="#5e366a" size={20} />
                </TouchableOpacity>
                <Card.Title style={styles.cardTitle}>{item.jobName}</Card.Title>
                <Card.Title style={styles.cardTitlee}>
                  {item.jobDescription}
                </Card.Title>
                <Image
                  source={{ uri: item?.image?.secure_url }}
                  style={styles.cardImage}
                />
              </Card>
            </>
          )}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("AddJob");
          }}
        >
          <Text style={styles.addButtonText}>Add Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container1: {
    flexDirection: "row",
    paddingTop: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: 15,
  },
  textHeader1: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "uppercase",
    marginLeft: 15,
    color: Color.primary,
  },

  addButton: {
    alignSelf: "flex-end",
    marginRight: Spacing,
    marginTop: Spacing,
    marginBottom: Spacing,
    backgroundColor: Color.background,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 2,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    borderRadius: 30,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
    position: "relative",
  },
  cardTitle: {
    color: Color.primary,
    fontSize: 19,
    letterSpacing: 2,
    marginBottom: 10,
  },
  cardTitlee: {
    color: "#4c4c4c",
    fontSize: 13,
    letterSpacing: 1,
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

  deleteIcon: {
    left: 300,
  },
});

export default Jobs;
