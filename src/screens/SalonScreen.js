import React, { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Alert } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import { FontAwesome as Icon } from "@expo/vector-icons";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../Common/Color";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { storeUsedSalon } from "../redux/user/userActions.js";
import { useTranslation } from 'react-i18next';

const SalonScreen = () => {
  const navigation = useNavigation();
  const [t, i18n] = useTranslation();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (searchText) => {
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filteredData);
  };

  const { role } = useSelector((state) => state.user.userData);

  const handleContinuePress = (item) => {
    dispatch(storeUsedSalon(item));
    console.log(storeUsedSalon(item));
    navigation.navigate("MainScreen2", { item });
  };

  const handleEditSalon = async (item) => {
    navigation.navigate("EditSalon", { item });
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      t('Confirm deletion'),
      t('Are you sure you want to delete this salon?'),
      [
        {
          text: t('Cancel'),
          style: "cancel",
        },
        {
          text: t('Yes, Delete'),
          onPress: () => handleDeletePress(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const baseUrl = "https://ayabeautyn.onrender.com";
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/salons/salon`);
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
      const response = await fetch(`${baseUrl}/salons/salon/${itemId}`, {
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
      <CustomSearchBar
        placeholder={t('Search your BeautyCenter')}
        onSearch={handleSearch}
      />
      {role === "Admin" && (
        <TouchableOpacity onPress={() => navigation.navigate("AddSalon")}>
          <Text style={styles.buttonStyle}>{t('Add Salon')}</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredItems.length > 0 ? filteredItems : items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            {role === "Admin" && (
              <View style={styles.Icons}>
                <TouchableOpacity onPress={() => handleEditSalon(item)}>
                  <Icon name="pencil" color="#5e366a" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item._id)}>
                  <Icon name="close" color="#5e366a" size={20} />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={() => handleContinuePress(item)}>
              <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
              <Image
                source={{ uri: item?.image?.secure_url }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <View style={styles.starContainer}>
                <Icon name="star" color="gold" size={20} />
                <Icon name="star" color="gold" size={20} />
                <Icon name="star" color="gold" size={20} />
                <Icon name="star-o" color="gold" size={20} />
                <Icon name="star-o" color="gold" size={20} />
              </View>
            </View>
            <Text
              style={{
                marginTop: 20,
                letterSpacing: 1,
                color: Color.primary,
                fontWeight: "bold",
              }}
            >
              {item.branches}
            </Text>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  card: {
    height: 360,
    borderRadius: 30,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
    position: "relative",
  },
  cardTitle: {
    color: Color.primary,
    fontSize: 17,
    letterSpacing: 2,
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  starContainer: {
    flexDirection: "row",
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
  // deleteIcon: {
  //   left: 300,
  // },
  // editButton: {
  //   left: 30,
  // },
  Icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SalonScreen;
