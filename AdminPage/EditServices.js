import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faFileSignature,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Color from "../src/Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import { Box, useToast } from "native-base";
import axios from "axios";
import { Select } from "native-base";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const EditServices = ({ route }) => {
  const { item } = route.params;
  const [t] = useTranslation();

  const { _id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );

  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedSubServices, setSelectedSubServices] = useState();

  const handleSubServicesChange = (selectedsubServices) => {
    setFData((prevData) => ({
      ...prevData,
      subServices: selectedsubServices,
    }));
    setSelectedSubServices(selectedsubServices);
  };

  const handleStautsChange = (selectedStauts) => {
    setFData((prevData) => ({
      ...prevData,
      status: selectedStauts,
    }));
    setSelectedStatus(selectedStauts);
  };
  useEffect(() => {
    setSelectedStatus(item.status);
    setSelectedSubServices(item.subServices);
  }, [item]);

  const initialValues = item
    ? { ...item }
    : {
        name: "",
        description: "",
        price: "",
        discount: "",
        time: "",
        subServices: [],
        status: [],
      };
  const [FData, setFData] = useState({
    ...initialValues,
  });

  const toast = useToast();

  const baseUrl = "https://ayabeautyn.onrender.com";
  const handleEditService = (itemId) => {
    const configurationObject = {
      url: `${baseUrl}/services/updateServices/${itemId}`,
      method: "PUT",
      data: FData,
    };
    axios(configurationObject)
      .then((response) => {
        // console.log("Response:", response);
        if (response.status === 200) {
          navigation.navigate("ServicesScreen");
          toast.show({
            render: () => (
              <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
                {t("Service updated successfully")}
              </Box>
            ),
          });
          setFData({
            name: "",
            description: "",
            price: "",
            discount: "",
            time: "",
            subServices: "",
            status: "",
            image: "",
            SalonId: salonId,
          });
        } else {
          throw new Error("An error has occurred");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        toast.show({
          render: () => (
            <Box bg="red.500" px="5" py="5" rounded="sm" mb={5}>
              {t("Error updating service")}
            </Box>
          ),
        });
      });
  };

  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.contanier}>
        <Text style={styles.TextStyleHeader}>{t("Update Service")}</Text>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.name}
            onChangeText={(text) => setFData({ ...FData, name: text })}
            style={styles.input}
            placeholder={t("Service name")}
          />
          <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.description}
            onChangeText={(text) => setFData({ ...FData, description: text })}
            style={[styles.input, styles.inputDis]}
            placeholder={t("Service description")}
            multiline={true}
          />
          <FontAwesomeIcon
            icon={faBook}
            style={[styles.icon, styles.iconDis]}
          />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.price.toString()}
            onChangeText={(text) => setFData({ ...FData, price: text })}
            style={styles.input}
            placeholder={t("Service price")}
          />
          <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.discount.toString()}
            onChangeText={(text) => setFData({ ...FData, discount: text })}
            style={styles.input}
            placeholder={t("Dis")}
          />
          <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.time.toString()}
            onChangeText={(text) => setFData({ ...FData, time: text })}
            style={styles.input}
            placeholder={t("Service time")}
          />
          <FontAwesomeIcon icon={faClock} style={styles.icon} />
        </View>

        <SafeAreaView
          style={{
            marginTop: 20,
          }}
        >
          <View style={styles.serviceListContainer}>
            <Select
              placeholder={t("Body")}
              color={Color.primary}
              style={{ width: 180, fontSize: 14 }}
              selectedValue={selectedSubServices}
              onValueChange={(value) => handleSubServicesChange(value)}
            >
              {[
                { id: 1, name: t("Body") },
                { id: 2, name: t("Face") },
              ].map((item) => (
                <Select.Item
                  key={item.id}
                  label={item?.name}
                  value={item.name}
                />
              ))}
            </Select>
          </View>

          <View style={styles.serviceListContainer}>
            <Select
              placeholder={t("ac")}
              color={Color.primary}
              style={{ width: 150, fontSize: 14 }}
              selectedValue={selectedStatus}
              onValueChange={(valueitem) => {
                handleStautsChange(valueitem);
              }}
            >
              {[
                { id: 1, name: t("ac") },
                { id: 2, name: t("Ina") },
              ].map((item) => (
                <Select.Item
                  key={item.id}
                  label={item?.name}
                  value={item.name}
                />
              ))}
            </Select>
          </View>
        </SafeAreaView>

        <TouchableOpacity onPress={() => handleEditService(item._id)}>
          <Text style={styles.buttonStyle}>{t("Update")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ServicesScreen")}>
          <Text style={[styles.buttonStyle, styles.buttonStyle1]}>
            {t("Cancel")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditServices;

const styles = StyleSheet.create({
  contanier: {
    width: "100%",
    height: "100%",
  },
  TextStyleHeader: {
    fontWeight: "500",
    color: Color.primary,
    fontSize: 24,
    marginTop: 70,
    marginBottom: 5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  formgroup: {
    display: "flex",
    position: "relative",
    marginTop: 20,
    flexDirection: "row",

    alignItems: "center",
  },
  icon: {
    position: "absolute",
    color: Color.primary,
    marginHorizontal: 20,
    padding: 11,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    padding: 50,
    marginHorizontal: 10,
    borderColor: "#c3b4d2",
    borderWidth: 2,
  },
  inputDis: {
    paddingBottom: 100,
  },
  iconDis: {
    marginHorizontal: 20,
    top: 20,
  },

  buttonStyle: {
    padding: 20,
    marginTop: 40,
    marginHorizontal: 10,
    backgroundColor: Color.primary,
    fontWeight: "400",
    fontSize: 19,
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#fff",
  },
  buttonStyle1: {
    backgroundColor: "transparent",
    color: Color.primary,
    marginTop: 10,
  },
  serviceListContainer: {
    width: "95%",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#c3b4d2",
    marginHorizontal: 10,
  },
});
