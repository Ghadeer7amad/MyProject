import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { Button } from "react-native-elements";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faFileSignature,
  faDollarSign,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import Color from "../src/Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { serialize } from "object-to-formdata";
import { Box, useToast } from "native-base";
import { useTranslation } from 'react-i18next';


const AddEmployee = () => {
  const [FData, setFData] = useState({
    name: "",
    job: "",
    experienceYears: "",
  });
  const toast = useToast();
  const navigation = useNavigation();
  const [t, i18n] = useTranslation();


  const [buttonText, setButtonText] = useState(t('Upload Image'));
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
      setButtonText(t('Image is uploaded successfully'));
    }
  };

  const addEmployee = async () => {
    try {
      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
        noFilesWithArrayNotation: false,
        dotsForObjectNotation: true,
      };

      const formData = serialize(FData, options);

      formData.append("image", {
        uri: image.uri,
        name: FData.name + ".jpg",
        type: "image/jpeg",
        size: image.fileSize,
      });
      const baseUrl = "https://ayabeautyn.onrender.com";

      const response = await fetch(`${baseUrl}/employees/employee`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
              {t('Employee was successfully added')}
            </Box>
          );
        },
      });
      navigation.navigate('EmployeesScreen');

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.TextStyleHeader}>{t('Add Employee')}</Text>

      <View style={styles.formgroup}>
        <TextInput
          value={FData.name}
          onChangeText={(text) => setFData({ ...FData, name: text })}
          style={styles.input}
          placeholder={t('Employee Name')}
        />
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput
          value={FData.job}
          onChangeText={(text) => setFData({ ...FData, job: text })}
          style={styles.input}
          placeholder={t('Employee Job')}
        />
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput
          value={FData.experienceYears}
          onChangeText={(text) => setFData({ ...FData, experienceYears: text })}
          style={styles.input}
          placeholder={t('Years of experience')}
        />
        <Icon name="checkmark-circle" size={22} style={styles.icon} />
      </View>

      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <Button
          title={buttonText}
          onPress={pickImage}
          buttonStyle={{
            backgroundColor: "transparent",
            width: "100%",
            height: 60,
            borderWidth: 2,
            borderColor: "#c3b4d2",
          }}
          titleStyle={{ color: "#757a79", fontSize: 15, marginLeft: 0 }}
        />
        <FontAwesomeIcon
          icon={faCloudUploadAlt}
          style={[styles.icon, styles.iconDis]}
        />
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{
              width: 335,
              height: 180,
              margin: 20,
              borderRadius: 10,
              marginLeft: 15,
            }}
          />
        )}
      </View>

      <TouchableOpacity onPress={addEmployee}>
        <Text style={styles.buttonStyle}>{t('Add Employee')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("EmployeesScreen")}>
        <Text style={[styles.buttonStyle, styles.buttonStyle1]}>{t('Cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEmployee;

const styles = StyleSheet.create({
  container: {
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
    marginTop: 10,
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
