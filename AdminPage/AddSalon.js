import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements"; 
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFileSignature,
  faCloudUploadAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Color from "../src/Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { serialize } from "object-to-formdata";
import { Box, useToast } from "native-base";
import { useTranslation } from "react-i18next";

const AddSalon = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const [FData, setFData] = useState({
    name: "",
    branches: [],
    openTimes: {
      startTime: "",
      endTime: "",
    },
  });

  const toast = useToast();

  const [buttonText, setButtonText] = useState(t("Upload Image"));
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
      setButtonText(t("Image is uploaded successfully"));
    }
  };
  const baseUrl = "https://ayabeautyn.onrender.com";

  const addSalon = async () => {
    try {
      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
        noFilesWithArrayNotation: false,
        dotsForObjectNotation: true,
      }; 

      const branchesArray = FData.branches.map((branch) => branch.trim());
      setFData({ ...FData, branches: branchesArray });

      const formData = serialize(
        { ...FData, branches: branchesArray },
        options
      );

      formData.append("image", {
        uri: image.uri,
        name: FData.name + ".jpg",
        type: "image/jpeg",
        size: image.fileSize,
      });

      const response = await fetch(`${baseUrl}/salons/salon`, {
        method: "POST",
        body: formData,
      });

      toast.show({
        render: () => (
          <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
            {t("Salon added successfully")}
          </Box>
        ),
      });
      navigation.replace("SalonScreen", { salonId: null });
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.TextStyleHeader}>{t("Add Salon")}</Text>

      <View style={styles.formgroup}>
        <TextInput
          value={FData.name}
          onChangeText={(text) => setFData({ ...FData, name: text })}
          style={styles.input}
          placeholder={t("Salon Name")}
        />
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <TextInput
          value={FData.branches.join(", ")}
          onChangeText={(text) =>
            setFData({
              ...FData,
              branches: text.split(",").map((branch) => branch.trim()),
            })
          }
          style={styles.input}
          placeholder={t("Branches")}
        />
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
      </View>

      <View style={styles.formgroup}>
        <FontAwesomeIcon icon={faClock} style={styles.icon} />
        <TextInput
          value={FData.openTimes.startTime}
          onChangeText={(text) =>
            setFData({
              ...FData,
              openTimes: { ...FData.openTimes, startTime: text },
            })
          }
          style={styles.input}
          placeholder={t("Start Time")}
        />
        <TextInput
          value={FData.openTimes.endTime}
          onChangeText={(text) =>
            setFData({
              ...FData,
              openTimes: { ...FData.openTimes, endTime: text },
            })
          }
          style={styles.input}
          placeholder={t("End Time")}
        />
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

      <TouchableOpacity onPress={addSalon}>
        <Text style={styles.buttonStyle}>{t("Add")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.replace("SalonScreen", { salonId: null })}
      >
        <Text style={[styles.buttonStyle, styles.buttonStyle1]}>
          {t("Cancel")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSalon;

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
