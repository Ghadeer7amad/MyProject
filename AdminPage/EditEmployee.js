import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "react-native-vector-icons/Ionicons";
import { faBook, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import Color from "../src/Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import { Box, useToast } from "native-base";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EditEmployee = ({ route }) => {
  const [t] = useTranslation();

  const { item } = route.params;

  const initialValues = item
    ? { ...item }
    : {
        name: "",
        job: "",
        experienceYears: "",
      };
  const [FData, setFData] = useState({
    ...initialValues,
  });
  const toast = useToast();

  const baseUrl = "https://ayabeautyn.onrender.com";
  const handleEditSalon = (itemId) => {
    const configurationObject = {
      url: `${baseUrl}/employees/employee/${itemId}`,
      method: "PUT",
      data: FData,
    };
    axios(configurationObject)
      .then((response) => {
        if (response.status === 200) {
          navigation.replace("EmployeesScreen");
          toast.show({
            render: () => (
              <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
                {t("Employee information")}
              </Box>
            ),
          });
          setFData({
            name: "",
            job: "",
            experienceYears: "",
          });
        } else {
          throw new Error("An error has occurred");
        }
      })

      .catch((error) => {
        toast.show({
          render: () => (
            <Box bg="red.500" px="5" py="5" rounded="sm" mb={5}>
              {t("Error in update")}
            </Box>
          ),
        });
      });
  };

  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.contanier}>
        <Text style={styles.TextStyleHeader}>{t("Update Employee")}</Text>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.name}
            onChangeText={(text) => setFData({ ...FData, name: text })}
            style={styles.input}
            placeholder={t("EmpName")}
          />
          <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.job}
            onChangeText={(text) => setFData({ ...FData, job: text })}
            style={[styles.input]}
            placeholder={t("EmpJob")}
          />
          <FontAwesomeIcon
            icon={faBook}
            style={[styles.icon, styles.iconDis]}
          />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={FData.experienceYears.toString()}
            onChangeText={(text) =>
              setFData({ ...FData, experienceYears: text })
            }
            style={styles.input}
            placeholder={t("Year")}
          />
          <Icon name="checkmark-circle" size={22} style={styles.icon} />
        </View>

        <TouchableOpacity onPress={() => handleEditSalon(item._id)}>
          <Text style={styles.buttonStyle}>{t("Update")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("EmployeesScreen")}
        >
          <Text style={[styles.buttonStyle, styles.buttonStyle1]}>
            {t("Cancel")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditEmployee;

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
});
