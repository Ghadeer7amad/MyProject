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
} from "@fortawesome/free-solid-svg-icons";
import Color from "../src/Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { serialize } from "object-to-formdata";
import { Box, useToast } from "native-base";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AddPost = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.user.userData.token);

  const { _id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );

  const [FData, setFData] = useState({
    textPost: "",
    SalonId: salonId,
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

 

  const addPost = async () => {
    try {
      setFData({
        ...FData,
      });

      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
        noFilesWithArrayNotation: false,
        dotsForObjectNotation: true,
      };

      const formData = serialize(FData, options);

      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: FData.name + ".jpg",
          type: "image/jpeg",
          size: image.fileSize,
        });
      }
      setIsLoading(true);
      const baseUrl = "https://ayabeautyn.onrender.com";

      const response = await fetch(`${baseUrl}/posts/post`, {
        method: "POST",
        headers: {
          Authorization: `Nada__${token}`,
        },
        body: formData,
      });

      setIsLoading(false);

      if (!response.ok) {
        console.error("Failed to upload post:", response.statusText);
      } 

      console.log(formData);

      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
              {t("Post added successfully")}
            </Box>
          );
        },
      });
      navigation.navigate("PostsScreen");

      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.TextStyleHeader}>{t("Add Post")}</Text>

      <View style={styles.formgroup}>
        <TextInput
          value={FData.textPost}
          onChangeText={(text) => setFData({ ...FData, textPost: text })}
          style={styles.input}
          placeholder={t("Write here")}
        />
        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
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

      <TouchableOpacity onPress={addPost} disabled={isLoading}>
        <Text style={styles.buttonStyle}>{isLoading ? "Adding..." : t("Add")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PostsScreen")}>
        <Text style={[styles.buttonStyle, styles.buttonStyle1]}>
          {t("Cancel")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPost;

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
