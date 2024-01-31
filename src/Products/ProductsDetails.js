import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";
import { BlurView } from "expo-blur";
import { useSelector, useDispatch } from "react-redux";
import { Box, useToast } from "native-base";
import { useTranslation } from "react-i18next";

const { height } = Dimensions.get("window");

const ProductsDetails = ({ route }) => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const token = useSelector((state) => state.user.userData.token);
  const toast = useToast();
  const { product } = route.params;
  const [isTouched, setIsTouched] = useState(false);
  const handlePressIn = () => {
    setIsTouched(true);
  };
  const handlePressOut = () => {
    setIsTouched(false);
  };

  const handleAddToFavorite = async (productId) => {
    const baseUrl = "https://ayabeautyn.onrender.com";
    try {
      const response = await fetch(`${baseUrl}/favorite/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nada__${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (response.status == 201) {
        const responseData = await response.json();
   
        navigation.navigate("Favorite");
      } else {
        toast.show({
          render: () => (
            <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
              {t("Product already in favorites")}
            </Box>
          ),
        });
        navigation.navigate("Favorite");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View
      style={{
        padding: Spacing,
        backgroundColor: Color.background,
        height: "100%",
      }}
    >
      <SafeAreaView>
        <ImageBackground
          source={{ uri: product?.image?.secure_url }}
          style={styles.ImageBackgroundStyle}
          imageStyle={{ borderRadius: Spacing * 1.5, marginTop: 20 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{ padding: Spacing * 2 }}
              onPress={() => navigation.navigate("ProductsScreens")}
            >
              <Ionicons
                name="arrow-back"
                color={Color.primary}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: Spacing * 2 }}>
              <Ionicons
                name="cart"
                color={Color.primary}
                size={Spacing * 2}
                onPress={() => navigation.navigate("CardsScreen")}
              />
            </TouchableOpacity>
          </View>

          <View style={{ borderRadius: Spacing, overflow: "hidden" }}>
            <BlurView tint="light" style={styles.BlurViewStyle}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {t("stock")} {product.stock}
                </Text>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {t("Discount")} %{product.discount}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.iconRating}>
                    <Ionicons
                      name="star"
                      size={Spacing * 1.5}
                      color={Color.primary}
                    />
                    <Text style={styles.productRating}>{product.rate}</Text>
                  </View>

                  <View style={styles.TowIcaonStyle}>
                    <View style={styles.icaonPosition}>
                      <Ionicons
                        name={"heart-outline"}
                        size={Spacing * 2}
                        onPress={() => handleAddToFavorite(product._id)}
                      />

                      <TouchableOpacity>
                        <Text style={styles.icanNameStyle}>{t("fav")}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </ImageBackground>
        <View>
          <View>
            <View>
              <Text style={styles.descriptionText}> {t("Description")} </Text>
            </View>
          </View>
          <Text style={styles.DiscriptionStyle}>{product.description}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 30, paddingLeft: 5 }}>
            <Text style={styles.priceStyle}>{t("Price")}</Text>
            <Text style={styles.priceStyle}>${product.finalPrice}</Text>
          </View>
          <TouchableOpacity
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
              onPress={() => navigation.navigate("CardsScreen")}
            >
              {t("Buy Now")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProductsDetails;

const styles = StyleSheet.create({
  ImageBackgroundStyle: {
    height: height * 0.7,
    justifyContent: "space-between",
    padding: 0,
  },
  BlurViewStyle: {
    padding: Spacing / 2,
  },
  productName: {
    fontSize: Spacing * 2,
    fontWeight: "bold",
    color: Color.primary,
    marginBottom: Spacing / 3,
  },
  iconRating: {
    flexDirection: "row",
    marginTop: Spacing,
    alignItems: "center",
  },
  productRating: {
    color: "black",
    marginLeft: Spacing / 2,
    fontWeight: "bold",
  },
  TowIcaonStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  icaonPosition: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginRight: Spacing,
  },
  icanNameStyle: {
    color: Color.primary,
    fontSize: Spacing,
  },
  DiscriptionStyle: {
    fontSize: 14,
    lineHeight: Spacing * 1.3,
    color: Color.secondary,
  },
  priceStyle: {
    fontSize: Spacing,
    marginLeft: Spacing / 2,
    color: "black",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: Spacing * 2,
    color: "black",
    marginTop: 20,
    marginBottom: Spacing / 2,
    fontWeight: "500",
  },
  touchedText: {
    backgroundColor: Color.secondary,
  },
  touchedTextButton: {
    color: "#235784",
  },
  styleTextButton: {
    color: Color.secondary,
    fontSize: Spacing * 1.5,
    fontWeight: "500",
  },
  ButtonStyle: {
    marginLeft: Spacing * 5,
    backgroundColor: Color.primary,
    paddingLeft: 60,
    paddingRight: 60,
    paddingVertical: 10,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing * 2,
  },
});
