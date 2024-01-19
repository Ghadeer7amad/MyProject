import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Color from "../Common/Color.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Box, useToast } from "native-base";
import { useSelector } from "react-redux";

const PathologicalCase = () => {
  const [problem, setProblem] = useState("");
  const toast = useToast();
  const { userData } = useSelector((state) => state.user);
  const { id: userId } = userData;

  const onChangeProblemHandler = (problem) => {
    setProblem(problem);
  };

  const navigation = useNavigation();
  const baseUrl = "https://ayabeautyn.onrender.com";

  const handleHomePress = () => {
    navigation.navigate("MainScreen2");
  };

  const handleProblem = async () => {
    const data = {
      problem: problem,
      user_id: userId,
    };

    try {
      const response = await fetch(`${baseUrl}/problems/problem`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        console.warn(json.error);
      }

      if (response.ok) {
        console.log("Response JSON:", json);

        toast.show({
          render: () => (
            <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
              Your status is submitted successfully
            </Box>
          ),
        });
        navigation.navigate("MainScreen2");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.textHeader}>Dear Lady,</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Ionicons
            name="arrow-back"
            color={Color.background}
            style={{ fontSize: 30, marginTop: 80, marginRight: 20 }}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.subText}>
        In order to complete the services as you want and with the desired
        results, we ask you to mention if you have any health problems or
        allergies to some things, or even if you are taking medications.
      </Text>

      <Icon name="pencil" size={30} color="black" style={styles.icon} />
      <View style={styles.container}>
        <TextInput
          value={problem}
          onChangeText={onChangeProblemHandler}
          style={styles.textInput}
          multiline={true}
          placeholder="    write here..."
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={handleProblem}>
          <Text style={styles.buttonStyle}>
            <Ionicons name="paper-plane" size={25} color="#ebebeb" /> Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomePress}>
          <Text style={styles.buttonStyle}>
            <Ionicons
              name="home"
              size={25}
              color="#ebebeb"
              style={styles.icon}
            />
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PathologicalCase;

const styles = StyleSheet.create({
  textHeader: {
    color: Color.primary,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 80,
    marginBottom: 5,
  },
  subText: {
    color: Color.background,
    fontSize: 17,
    marginLeft: 20,
    marginBottom: 3,
    letterSpacing: 1,
    lineHeight: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 220,
    flexDirection: "row",
  },
  textInput: {
    width: "90%", // العرض المرغوب
    height: 400, // الارتفاع المرغوب
    borderColor: "#fff",
    borderWidth: 0.5,
    fontSize: 18,
    textAlignVertical: "top", // لجعل النص يبدأ من أعلى الخانة
    backgroundColor: "#ebebeb",
  },
  icon: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonStyle: {
    padding: 18,
    marginTop: 230,
    fontWeight: "400",
    fontSize: 20,
    color: "#ebebeb",
    backgroundColor: Color.primary,
  },
});
