import React, { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Alert } from "react-native";
import { Card, Text } from "react-native-elements";
import { FontAwesome as Icon } from "@expo/vector-icons";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../Common/Color";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { storeUsedSalon } from "../redux/user/userActions.js";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const SalonScreen = ({ route }) => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (searchText) => {
    const filteredData = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.branches.some((branch) =>
          branch.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setFilteredItems(filteredData);
  };

  const { role, token } = useSelector((state) => state.user.userData);
  const { salonId } = route.params;

  const handleContinuePress = (item) => {
    dispatch(storeUsedSalon(item));
    navigation.navigate("MainScreen2", { item });
  };

  const handleEditSalon = async (item) => {
    navigation.navigate("EditSalon", { item });
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

  const baseUrl = "https://ayabeautyn.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/salons/salon`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Nada__${token}`,
          },
        });
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSalonData = async () => {
      try {
        const response = await fetch(`${baseUrl}/salons/salon/${salonId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Nada__${token}`,
          },
        });
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (role === "Admin" || role == "User") {
      fetchData();
    } else if (role === "Manager") {
      fetchSalonData();
    }
  }, [role, baseUrl, token, salonId]);

  const handleDeletePress = async (itemId) => {
    try {
      const response = await fetch(`${baseUrl}/salons/salon/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        const responseData = await response.json();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomSearchBar
        placeholder={t("Search for BeautyCenters or Cities..")}
        onSearch={handleSearch}
      />
      {role === "Admin" && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("AddSalon")}>
            <Text style={styles.buttonStyle}>{t("Add Salon")}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("AddManager")}>
            <Text style={styles.buttonStyle}>{t("Add Manager")}</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredItems.length > 0 ? filteredItems : items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            {(role === "Admin" || role === "Manager") && (
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
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginTop: 20,
                  letterSpacing: 1,
                  color: Color.primary,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {item.branches.join(" | ")}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  backgroundColor: Color.primary,
                  padding: 7,
                  borderRadius: 15,
                  marginTop: 15,
                  marginRight: -6,
                }}
              >
                <FontAwesomeIcon icon={faClock} style={styles.icon} />

                <Text
                  style={{
                    letterSpacing: 1,
                    color: Color.secondary,
                    fontWeight: "bold",
                  }}
                >
                  {item.openTimes
                    ? `${item.openTimes.startTime} am - ${item.openTimes.endTime} pm`
                    : "Not available"}
                </Text>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  card: {
    height: 360,
    borderRadius: 30,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: "100",
    padding: 10,
    backgroundColor: Color.background,
    fontWeight: "400",
    fontSize: 15,
    letterSpacing: 2,
    textAlign: "center",
    color: "#fff",
    borderRadius: 7,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    color: Color.secondary,
    marginRight: 5,
  },
});

export default SalonScreen;
