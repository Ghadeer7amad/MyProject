import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Color from "../Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../Common/Spacing.js";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Advice = () => {
  const [t] = useTranslation();
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require("../../assets/new.jpg"),
    require("../../assets/new.jpg"),
    require("../../assets/new.jpg"),
    require("../../assets/new.jpg"),
  ];

  const texts = [t("one"), t("two"), t("three"), t("four")];

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const windowWidth = Dimensions.get("window").width;

  return (
    <ScrollView>
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.floor(
              event.nativeEvent.contentOffset.x /
                event.nativeEvent.layoutMeasurement.width
            );
            handleSlideChange(slideIndex);
          }}
        >
          {images.map((image, index) => (
            <View key={index} style={{ width: windowWidth, height: 900 }}>
              <Image
                source={image}
                style={[
                  styles.image,
                  { width: "100%", height: "100%", position: "relative" },
                ]}
                resizeMode="cover"
              />

              <View style={styles.textContainer}>
                <Text style={styles.title}>{t("tips")}</Text>
                <Text style={styles.description}>{texts[index]}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? "#ffa952" : "#D1D1D1",
              },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: -50,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
  textContainer: {
    position: "absolute",
    bottom: 400,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 30,
  },

  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "black",
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 10,
  },
});

export default Advice;
