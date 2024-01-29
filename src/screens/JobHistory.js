import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import CustomSearchBar from "../Common/SearchBarComponent.js";
import Header from "../screens/Header.js";
import NavbarButtom from "../Common/NavbarButtom.js";
import Color from "../Common/Color.js";
import Spacing from "../Common/Spacing.js";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";


const JobHistory = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const token = useSelector((state) => state.user.userData.token);

  const { _id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Services, setServices] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleHomePress = (item) => {
    navigation.navigate("MainScreen2", { item });
  };

  const handleSearch = (searchText) => {
    const filteredData = items.filter((item) =>
      item.user_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filteredData);
  };

  const baseUrl = "https://ayabeautyn.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/salons/${salonId}/Uploadjob/uploadjob`, {

          headers: {
            "Content-Type": "application/json",
            Authorization: `Nada__${token}`,
          },
        });
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={[styles.styleText]}>{t("Job archive")}</Text>
        <CustomSearchBar
          placeholder={t("Search person")}
          onSearch={handleSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={filteredItems.length > 0 ? filteredItems : items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.appointmentContainer}>
              <View style={styles.userContainer}>
                <Text style={styles.userName}>{item.user_name}</Text>
                <View
                  style={{ display: "flex", gap: 15, flexDirection: "row" }}
                >
                  <Icon name="briefcase" size={25} color="#555555" />
                  <Text style={styles.appointmentContent}>
                    Job name: {item.jobName}
                  </Text>
                </View>
                <View
                  style={{ display: "flex", gap: 15, flexDirection: "row" }}
                >
                  <Icon name="file-pdf-o" size={25} color="#555555" />
                  <Text style={styles.appointmentContent}>CV File:</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.cvFile.secure_url)}
                  >
                    <Icon name="download" size={25} color="#555555" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity onPress={handleHomePress}>
        <Text style={styles.buttonStyle}>{t("Home")}</Text>
      </TouchableOpacity>

      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  appointmentContainer: {
    backgroundColor: "#ffffff",
    margin: 15,
    marginBottom: 2,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.primary,
    position: "relative",
  },
  userContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  userName: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#555555",
  },
  appointmentContent: {
    fontSize: 20,
    color: "#848482",
    fontWeight: "bold",
    marginBottom: 15,
  },
  styleText: {
    color: Color.primary,
    fontSize: Spacing * 2,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: -15,
  },
  buttonStyle: {
    width: "35%",
    padding: 10,
    marginHorizontal: 250,
    fontWeight: "400",
    fontSize: 18,
    letterSpacing: 2,
    textAlign: "center",
    color: Color.secondary,
    backgroundColor: Color.primary,
    alignSelf: "center",
    marginTop: 15,
  },
  deleteIcon: {
    marginTop: -80,
  },
  removeButton: {
    position: "absolute",
    top: Spacing / 2,
    left: Spacing * 22,
    padding: Spacing / 2,
    zIndex: 1,
  },
});

export default JobHistory;