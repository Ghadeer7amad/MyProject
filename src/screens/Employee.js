import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const screenwidth = Dimensions.get("window").width;
const screenheight = Dimensions.get("window").height;

const Employee = () => {
  const navigation = useNavigation();
  const [t, i18n] = useTranslation();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { _id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );
  const baseUrl = "https://ayabeautyn.onrender.com";
  useEffect(() => {
    fetch(`${baseUrl}/salons/${salonId}/Employee/employee`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => console.log("Error from favs screen: ", error.message));
  }, []);

  return (
    <View style={{ marginTop: 30 }}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 20,
            marginVertical: 10,
            marginLeft: 10,
            fontWeight: "bold",
          }}
        >
          {t("Beauty Employee")}
        </Text>
        <Text
          style={{
            textTransform: "capitalize",
            fontSize: 15,
            marginVertical: 10,
            marginRight: 10,
          }}
        >
          {t("See more")}
          <Ionicons name="arrow-forward" color="#f9b248" size={20} />
        </Text>
      </View>
      <ScrollView
        snapToInterval={screenwidth}
        decelerationRate="fast"
        alwaysBounceHorizontal={true}
        horizontal
      >
        {items.map((item, index) => (
          <View
            key={index}
            style={{
              alignItems: "center",
              width: screenwidth - 180,
              height: screenheight - 1000,
              borderRadius: 60,
              backgroundColor: Color.background,
              marginHorizontal: 5,
            }}
          >
            <Image
              source={{ uri: item?.image?.secure_url }}
              style={{
                width: screenwidth - 180,
                height: screenheight - 600,
                resizeMode: "contain",
                borderTopLeftRadius: 60,
                borderTopRightRadius: 60,
              }}
            />
            <Text
              style={{ color: "#fff", letterSpacing: 1.5, marginBottom: 3 }}
            >
              {item.name}
            </Text>
            <Text style={{ color: Color.secondary, marginBottom: 3 }}>
              {item.experienceYears} {t("years of experience")}
            </Text>
            <View style={styles.starContainer}>
              <Icon name="star" color="gold" size={15} />
              <Icon name="star" color="gold" size={15} />
              <Icon name="star-o" color="gold" size={15} />
              <Icon name="star-o" color="gold" size={15} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Employee;

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
});
