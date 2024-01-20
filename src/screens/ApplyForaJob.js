import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../Common/Spacing.js";
import * as DocumentPicker from "expo-document-picker";
import Color from "../Common/Color";
import { Box, useToast } from "native-base";
import axios from "axios";
import { useSelector } from "react-redux";
import { Select } from "native-base";
import { useTranslation } from "react-i18next";

const ApplyForaJob = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedJob, setSelectedJob] = useState("Laser Specialist");
  const [isLoading, setIsLoading] = useState(false);

  const [buttonText, setButtonText] = useState(t("Upload File"));
  const [image, setImage] = useState(null);

  const [items, setItems] = useState([]);

  const { id: userId, name: userName } = useSelector(
    (state) => state.user.userData
  );
  const { _id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );

  const [FData, setFData] = useState({
    user_id: userId,
    user_name: userName,
  });

  const toast = useToast();

  const baseUrl = "https://ayabeautyn.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/salons/${salonId}/Job/job`
        );
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled) {
        setSelectedFile(result);
        setButtonText(t("File is uploaded successfully"));
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const onSubmitPressed = async () => {
    try {
      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
        noFilesWithArrayNotation: false,
        dotsForObjectNotation: true,
      };

      const updatedFData = {
        ...FData,
        jobName: selectedJob,
        image: selectedFile.uri,
      };

      const formData = new FormData();

      formData.append("image", {
        name: selectedFile.assets[0]?.name,
        uri: selectedFile.assets[0]?.uri,
        mimetype: selectedFile.assets[0]?.mimeType,
      });

      formData.append("user_id", userId);
      formData.append("user_name", userName);
      formData.append("jobName", selectedJob);

      console.log("Selected File:", selectedFile.assets[0]);
      console.log(JSON.stringify(formData));

      const response = await axios.post(
        `${baseUrl}/uploadjobs/uploadjob`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server Response:", response);

      if (response.status === 201) {
        toast.show({
          render: () => (
            <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
              Added successfully
            </Box>
          ),
        });
      } else {
        console.error("Server Error:", response.status, response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error.stack);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/11.jpg")}
      style={styles.container}
    >
      <TouchableOpacity
        style={{ marginLeft: Spacing * 2, marginTop: Spacing * 3 }}
        onPress={() => {
          navigation.navigate("MainJob");
        }}
      >
        <Ionicons name="arrow-back" color={Color.primary} size={Spacing * 2} />
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "center", marginTop: -200 }}>
        <Text style={styles.labelStyle}>{t("Choose The Job:")}</Text>

        <View style={styles.labeledContainerStyle}>
          <Select
            placeholder={t("Select Job")}
            selectedValue={selectedJob}
            onValueChange={(itemValue, itemIndex) => setSelectedJob(itemValue)}
            style={styles.pickerStyle}
          >
            {items.map((item) => (
              <Select.Item
                key={item.id}
                label={item.jobName}
                value={item.jobName}
              />
            ))}
          </Select>
        </View>

        <Text style={[styles.labelStyle, { marginTop: 20 }]}>
          {t("Attach your CV (PDF):")}
        </Text>

        <TouchableOpacity
          onPress={pickDocument}
          style={styles.fileUploadButton}
        >
          <Text style={styles.fileUploadText}>{buttonText}</Text>
        </TouchableOpacity>

        {selectedFile && (
          <Text
            style={styles.selectedFileText}
          >{`Selected File: ${selectedFile}`}</Text>
        )}

        <Text style={styles.uploadInfoText}>{t("Upload your cv")}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onSubmitPressed}>
          <Text style={styles.buttonStyle}>
            <Ionicons name="paper-plane" size={25} color="#ebebeb" />
            {t("Submit Form")}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  labelStyle: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    color: "black",
  },
  labeledContainerStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
  },
  buttonStyle: {
    padding: 15,
    marginTop: 10,
    marginHorizontal: 100,
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    color: "#ebebeb",
    backgroundColor: Color.background,
    borderRadius: 5,
  },
  fileUploadButton: {
    backgroundColor: Color.background,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: 370,
    height: 60,
    alignSelf: "center",
  },
  fileUploadText: {
    color: "#ebebeb",
    fontSize: 16,
  },
  selectedFileText: {
    color: "gray",
    marginTop: 10,
  },
  uploadInfoText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    color: "gray",
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    color: "gray",
    fontSize: 16,
  },
});

export default ApplyForaJob;
