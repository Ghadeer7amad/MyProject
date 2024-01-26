import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFileSignature,
  faUser,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Color from "../src/Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import { Box, useToast } from "native-base";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editCurrentUser } from "../src/redux/user/userActions.js";
import { useTranslation } from 'react-i18next'; 

const EditProfile = ({ route }) => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const token = useSelector((state) => state.user.userData.token);


  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const {
    id: userId,
    name: userName,
    age: userAge,
    phone: userPhone,
    address: userAddress,
  } = useSelector((state) => state.user.userData);

  const baseUrl = "https://ayabeautyn.onrender.com";

  const initialValues = {
    userName,
    age: userAge,
    phone: userPhone,
    address: userAddress,
  };
  const [FData, setFData] = useState({  
    ...initialValues,
  });
  const toast = useToast();

  const handleEditProfile = () => {
    const configurationObject = {
      url: `${baseUrl}/profiles/profile/${userId}`,
      method: "PUT",
      headers: {
        'Authorization': `Nada__${token}`
      },
      data: FData,
    };

    axios(configurationObject)
      .then((response) => {
        if (response.status === 200) {
          navigation.navigate("Settings");
          console.log(response.data);
          dispatch(
            editCurrentUser({ ...response.data, name: response.data.userName })
          );
          toast.show({
            render: () => (
              <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
                {t('Profile updated successfully')}
              </Box>
            ),
          });
        } else {
          throw new Error(`An error has occurred`);
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);

        const errorMessage =
          error.response?.data?.message || "An error has occurred";

        toast.show({
          render: () => (
            <Box bg="red.500" px="5" py="5" rounded="sm" mb={5}>
              {errorMessage}
            </Box>
          ),
        });
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textStyleHeader}>{t('Update Profile')}</Text>

        <View style={styles.formGroup}>
          <TextInput
            value={FData.userName}
            onChangeText={(text) => setFData({ ...FData, userName: text })}
            style={styles.input}
            placeholder={userName}
          />
          <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
        </View>

        <View style={styles.formGroup}>
        <TextInput
         value={`${FData.age}`}  // Convert number to string
         onChangeText={(text) => setFData({ ...FData, age: text })}
        style={[styles.input]}
        placeholder={`${userAge}`}
/>
          <FontAwesomeIcon
            icon={faUser}
            style={[styles.icon, styles.iconDis]}
          />
        </View>

        <View style={styles.formGroup}>
          <TextInput
            value={FData.phone}
            onChangeText={(text) => setFData({ ...FData, phone: text })}
            style={[styles.input]}
            placeholder={`${userPhone}`}
          />
          <FontAwesomeIcon
            icon={faPhone}
            style={[styles.icon, styles.iconDis]}
          />
        </View>

        <View style={styles.formGroup}>
          <TextInput
            value={FData.address}
            onChangeText={(text) => setFData({ ...FData, address: text })}
            style={[styles.input]}
            placeholder={userAddress}
          />
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={[styles.icon, styles.iconDis]}
          />
        </View>

        <TouchableOpacity onPress={() => handleEditProfile()}>
          <Text style={styles.buttonStyle}>{t('Update')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Text style={[styles.buttonStyle, styles.buttonStyle1]}>{t('Cancel')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  textStyleHeader: {
    fontWeight: "500",
    color: Color.primary,
    fontSize: 24,
    marginTop: 70,
    marginBottom: 5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  formGroup: {
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

export default EditProfile;
