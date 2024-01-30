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
import { useNavigation } from "@react-navigation/native";
import Color from "../Common/Color.js";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Spacing from "../Common/Spacing.js";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CardsScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const token = useSelector((state) => state.user.userData.token);
  const [cartData, setCartData] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePressIn = () => {
    setIsTouched(true);
  };
  const handlePressOut = () => {
    setIsTouched(false);
  };
  const handleProductPress = () => {
    navigation.navigate("ProductsScreens");
  };

  const handleCheckOut = async () => {
    try {
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/cart/calculateTotalPrice`, {
        headers: {
          Authorization: `Nada__${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const totalPrice = data.totalCartPrice;
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };
  useEffect(() => {
    handleCheckOut();
  }, [token]);

  const fetchCartData = async () => {
    try {
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/cart/getCart`, {
        headers: {
          Authorization: `Nada__${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCartData(data.cart);
    } catch (error) {
      console.error("Error from favs screen:", error.message);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, [token]);

  useEffect(() => {}, [cartData]);

  const onRemoveItem = async (productId) => {
    try {
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/cart/removeItem`, {
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
      fetchCartData();
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/cart/increaseQuantity`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nada__${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.status === 401) {
        setErrorMessage((prevMessages) => ({
          ...prevMessages,
          [productId]: t("This product"),
        }));
      }
      fetchCartData();
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const baseUrl = "https://ayabeautyn.onrender.com";
      const response = await fetch(`${baseUrl}/cart/decreaseQuantity`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nada__${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      if (response.status === 400) {
        await onRemoveItem(productId);
        fetchCartData();
      } else {
        fetchCartData();
      }
    } catch (error) {
      console.error(t("Error updating quantity"), error.message);
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
            <BlurView style={{ height: "100%", padding: Spacing / 4 }}>
              <Image
                source={require("../../assets/aya5.jpg")}
                style={styles.imageStyle}
              />
            </BlurView>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 30, textAlign: "left", color: "#929aab" }}>
            {t("Shopping")}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "left",
              color: "black",
            }}
          >
            {t("Cart")}
          </Text>
        </View>
      </View>

      <ScrollView style={{ marginTop: 10 }}>
        {cartData &&
          cartData.products &&
          cartData.products.map((product) => (
            <View key={product._id} style={styles.productContainer}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Image
                  source={{ uri: product.productId?.image?.secure_url }}
                  style={styles.productImage}
                />

                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "70%",
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.productName}>
                      {product.productId?.name}
                    </Text>
                    <Ionicons
                      name="heart"
                      color={Color.primary}
                      style={{ marginLeft: "auto", fontSize: 20 }}
                      onPress={() => navigation.navigate("Favorite")}
                    />
                  </View>

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

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => onRemoveItem(product.productId?._id)}
                    >
                      <Ionicons
                        name="trash-bin"
                        color={Color.background}
                        style={{ fontSize: 25, marginRight: 70 }}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: Color.background,
                        alignItems: "center",
                        borderRadius: 5,
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      <Ionicons
                        name="add"
                        color={Color.background}
                        style={{ fontSize: 30, backgroundColor: "#f0fbff" }}
                        onPress={() => increaseQuantity(product.productId?._id)}
                      />

                      <Text
                        style={{
                          textAlign: "center",
                          marginLeft: 10,
                          marginRight: 10,
                          color: Color.secondary,
                        }}
                      >
                        {product.quantity}
                      </Text>

                      <Ionicons
                        name="remove-outline"
                        color={Color.background}
                        style={{
                          marginLeft: "auto",
                          fontSize: 30,
                          backgroundColor: "#f0fbff",
                        }}
                        onPress={() => decreaseQuantity(product.productId?._id)}
                      />
                    </View>
                  </View>
                  <Text
                    style={{ textAlign: "center", color: "red", fontSize: 10 }}
                  >
                    {errorMessage[product.productId?._id]}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        {(!cartData ||
          !cartData.products ||
          cartData.products.length === 0) && (
          <View style={styles.noCartsContainer}>
            <Text style={styles.noCartsText}>{t("Cart is Empty")}</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
            borderBottomWidth: 1,
            borderColor: "black",
          }}
        >
          <Text style={{ fontSize: 25, color: "black" }}>
            {t("Total Price")}
          </Text>
          <Text style={{ fontSize: 25, color: "#929aab" }}>${totalPrice}</Text>
        </View>

        <TouchableOpacity
          onPress={() => handleCheckOut()}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={[styles.ButtonStyle, isTouched ? styles.touchedText : null]}
        >
          <Text
            style={[
              styles.styleTextButton,
              isTouched ? styles.touchedTextButton : null,
            ]}
          >
            {t("Check Out")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 40,
  },
  productImage: {
    width: 150,
    height: 140,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginRight: 20,
  },
  productPrice: {
    fontSize: 15,
    color: "black",
    marginLeft: "auto",
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
    backgroundColor: Color.background,
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
    backgroundColor: Color.primary,
    marginBottom: 30,
    margin: 20,
    padding: 15,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  noCartsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  noCartsText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#929aab",
  },
});
