import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Spacing from "../Common/Spacing.js";
import NavbarTop from "../Common/navbarTop.js";
import SearchProANDSer from "../Common/SerachProANDSer.js";
import Color from "../Common/Color.js";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavbarButtom from "../Common/NavbarButtom";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

const ProductsScreens = () => {
  const navigation = useNavigation();
  const [products, setproducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Body");
  const { role } = useSelector((state) => state.user.userData);

  const handleBookPress = () => {
    navigation.navigate("BookingScreen");
  };
  const handleCardsPress = () => {
    navigation.navigate("CardsScreen");
  };
  const handleFavoritePress = () => {
    navigation.navigate("Favorite");
  };
  const handleDetailsPress = (product) => {
    navigation.navigate("ProductsDetails", { product });
  };

  const handleRemoveProducts = async (itemId) => {
    console.log("Deleting item with ID:", itemId);
    try {
      const response = await fetch(`${baseUrl}/products/hardDelete/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setproducts((prevProduct) =>
          prevProduct.filter((product) => product._id !== itemId)
        );
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
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: () => handleRemoveProducts(itemId),
        },
      ],
      { cancelable: false }
    );
  };
  const handleBodyPress = async () => {
    try {
      console.log("Fetching products...");
      const response = await fetch(`${baseUrl}/products/getBodyProducts`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data);
      setproducts(data.products);
      setSelectedItem("Body");
    } catch (error) {
      console.error("Error fetching body-related products:", error.message);
    }
  };

  const handleFacePress = async () => {
    try {
      console.log("Fetching products...");
      const response = await fetch(`${baseUrl}/products/getFaceProducts`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data);
      setproducts(data.products);
      setSelectedItem("Face");
    } catch (error) {
      console.error("Error fetching body-related products:", error.message);
    }
  };

  const baseUrl = "https://ayabeautyn.onrender.com";
  useEffect(() => {
    console.log("Fetching products...");
    fetch(`${baseUrl}/products/getProducts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setproducts(data.products);
      })
      .catch((error) => console.log("Error from favs screen: ", error.message));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: Spacing }}>
        <NavbarTop />

        <View style={{ width: "100%" }}>
          <Text style={styles.styleText}>
            find the best{" "}
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/122.jpg")}
            />
          </Text>
          <Text style={[styles.styleText, styles.styleText2]}>
            product for you
          </Text>
          {role === "Admin" && (
            <TouchableOpacity
              onPress={() => navigation.navigate("AddProduct")}
              style={{
                marginTop: 30,
                backgroundColor: Color.primary,
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Add product
              </Text>
            </TouchableOpacity>
          )}

          <SearchProANDSer />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleBodyPress}>
              <Text
                style={[
                  styles.Sub1,
                  selectedItem === "Body" ? styles.selectedText1 : null,
                ]}
              >
                Body
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFacePress}>
              <Text
                style={[
                  styles.Sub2,
                  selectedItem === "Face" ? styles.selectedText2 : null,
                ]}
              >
                Face
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            style={{ height: 300, resizeMode: "contain", width: "100%" }}
            source={require("../../assets/back.jpg")}
          />
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
              marginTop: 15,
              marginBottom: 10,
            }}
          >
            chose product now!
          </Text>
        </View>

        <View style={styles.ProductStyle}>
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <View key={index} style={styles.EveryProduct}>
                <BlurView
                  tint="default"
                  intensity={90}
                  style={{ padding: Spacing / 2 }}
                >
                  {role === "Admin" && (
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => confirmDelete(product._id)}
                    >
                      <Ionicons name="close" color="red" size={Spacing * 1.5} />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={{ width: "100%", height: 150 }}
                    onPress={() => handleDetailsPress(product)}
                  >
                    <Image
                      source={{ uri: product?.image?.secure_url }}
                      style={styles.ImageStyle}
                    />
                    <View style={styles.StyleTop}>
                      <BlurView style={styles.BlurViewTop}>
                        <Ionicons
                          name="star"
                          color={Color.primary}
                          size={Spacing * 1.4}
                          onPress={handleFavoritePress}
                        />
                        <Text style={styles.RatingStyle}>{product.rate}</Text>
                      </BlurView>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.NameStyle}>{product.name}</Text>
                  <Text style={styles.includedStyle}>
                    Quantity {product.stock}
                  </Text>

                  <View style={styles.styleRow}>
                    <Text style={styles.PriceStyle}>
                      $ {product.finalPrice}
                    </Text>

                    <TouchableOpacity
                      style={styles.styleIcons}
                      onPress={handleCardsPress}
                    >
                      <Ionicons
                        name="add"
                        size={Spacing * 2}
                        color={Color.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
            ))}
        </View>
      </ScrollView>
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </View>
  );
};

export default ProductsScreens;

const styles = StyleSheet.create({
  ProductStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  EveryProduct: {
    width: "48%",
    marginBottom: 30,
    overflow: "hidden",
    backgroundColor: "#986ead",
  },
  Sub1: {
    backgroundColor: Color.background,
    marginLeft: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  Sub2: {
    backgroundColor: Color.secondary,
    marginLeft: 30,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderColor: Color.background,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  ImageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: Spacing / 2,
  },
  StyleTop: {
    position: "absolute",
    right: 0,
    borderBottomStartRadius: Spacing * 5,
    borderTopEndRadius: Spacing,
    overflow: "hidden",
  },
  BlurViewTop: {
    flexDirection: "row",
    padding: Spacing / 2,
    backgroundColor: Color.background,
  },
  RatingStyle: {
    color: "#fff",
    marginLeft: Spacing / 2,
  },
  NameStyle: {
    color: Color.primary,
    fontWeight: "bold",
  },
  includedStyle: {
    color: Color.primary,
    fontSize: 12,
  },
  styleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  styleDollerSign: {
    color: Color.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  PriceStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  styleIcons: {
    backgroundColor: Color.primary,
    padding: Spacing / 4,
    borderRadius: Spacing,
  },
  styleText: {
    color: "black",
    fontSize: Spacing * 2,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  styleText2: {
    color: "#d9b650",
  },
  removeButton: {
    position: "absolute",
    top: Spacing / 3,
    left: Spacing / 10,
    padding: Spacing / 10,
    zIndex: 1,
  },
  Sub1: {
    color: "black",
    marginLeft: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 20,
    borderColor: Color.background,
    borderWidth: 1,
  },
  selectedText1: {
    color: "#fff",
    backgroundColor: Color.background,
    marginLeft: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 20,
    borderColor: Color.background,
    borderWidth: 1,
  },
  Sub2: {
    color: "black",
    marginLeft: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 20,
    borderColor: Color.background,
    borderWidth: 1,
  },
  selectedText2: {
    color: "#fff",
    backgroundColor: Color.background,
    marginLeft: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 20,
    borderColor: Color.background,
    borderWidth: 1,
  },
});
