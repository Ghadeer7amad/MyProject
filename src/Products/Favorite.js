import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Color from "../Common/Color.js";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../Common/Spacing.js";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const FavoriteScreens = ({ favoriteProducts }) => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const token = useSelector((state) => state.user.userData.token);
  const [FavoriteData, setFavoriteData] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  const handlePressIn = () => {
    setIsTouched(true);
  };
  const handlePressOut = () => {
    setIsTouched(false);
  };

  const handleProductPress = (product) => {
    navigation.navigate("ProductsDetails", { product });
  };

  const fetchFavoriteData = async () => {
    try {
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/favorite/getFavorite`, {
        headers: {
          Authorization: `Nada__${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFavoriteData(data.Favorite.products);
    } catch (error) {
      console.error("Error fetching favorite data:", error.message);
    }
  };
  useEffect(() => {
    fetchFavoriteData();
  }, [token]);

  useEffect(() => {}, [FavoriteData]);

  const onRemoveItem = async (productId) => {
    try {
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/favorite/removeItem`, {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nada__${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchFavoriteData();
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={{ padding: 40 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Ionicons
            name="arrow-back"
            color={Color.background}
            style={{ fontSize: 30 }}
            onPress={() => navigation.navigate("ProductsScreens")}
          />
          <View style={styles.imageContainer}>
            <View style={{ height: "100%", padding: Spacing / 4 }}>
              <Ionicons
                name="cart"
                color={Color.background}
                size={Spacing * 2}
                onPress={() => navigation.navigate("CardsScreen")}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 30, textAlign: "left", color: "#929aab" }}>
              {t("Favorite")}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "left",
                color: "black",
              }}
            >
              {t("Products")}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ marginTop: 5 }}>
        {FavoriteData && FavoriteData.length > 0 ? (
          FavoriteData &&
          FavoriteData.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.productContainer}
              onPress={() => handleProductPress(product)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemoveItem(product.productId?._id)}
              >
                <Ionicons name="trash" color="red" size={Spacing} />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: product.productId?.image?.secure_url }}
                  style={styles.productImage}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.productName}>
                    {product.productId?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "70%",
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.productPrice}>
                      ${product.productId?.finalPrice}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noFavoritesContainer}>
            <Text style={styles.noFavoritesText}>
              {t("Favorite products are not available")}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default FavoriteScreens;

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 25,
  },
  productImage: {
    width: 150,
    height: 140,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 15,
    color: "#929aab",
  },
  imageStyle: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    width: Spacing * 4,
    height: Spacing * 4,
    overflow: "hidden",
    borderRadius: Spacing * 2,
  },
  touchedText: {
    backgroundColor: "#acdcee",
  },
  touchedTextButton: {
    color: Color.secondary,
  },
  styleTextButton: {
    color: Color.secondary,
    fontSize: Spacing * 1.5,
    fontWeight: "500",
  },
  ButtonStyle: {
    backgroundColor: Color.background,
    marginBottom: 30,
    margin: 20,
    padding: 15,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    position: "absolute",
    top: Spacing * 5,
    left: Spacing * 20,
    padding: Spacing / 10,
    zIndex: 1,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  noFavoritesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#929aab",
  },
});
