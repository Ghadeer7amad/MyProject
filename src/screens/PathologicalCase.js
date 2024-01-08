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
import axios from "axios";
import { useSelector } from "react-redux";

const PathologicalCase = () => {
  const [problem, setProblem] = useState("");

  const onChangeProblemHandler = (problem) => {
    setProblem(problem);
  };

  const navigation = useNavigation();

  const handleProblem = async () => {
    const baseUrl = "https://ayabeautyn.onrender.com";
    //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA5N2FmYTBlMTZmZmRjZmMwNTBkMCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMjIyNzgwNSwiZXhwIjoxNzAyMjMxNDA1fQ.hmV060BPh5uYiBGrghwJSTrHR4JTw_wfk7U5iDmVKZc"
    try {
      const response = await axios.post(`${baseUrl}/problems/problem`, {
        problem,
      });

      if (response.status === 201) {
        setProblem("");
        navigation.navigate("SalonScreen");
      } else {
        console.error("Error:", error.response.status, error.response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
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

      <TouchableOpacity
        onPress={() => {
          handleProblem();
        }}
      >
        <Text style={styles.buttonStyle}>
          <Ionicons name="paper-plane" size={25} color="#ebebeb" /> Submit Form
        </Text>
      </TouchableOpacity>
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
    padding: 15,
    marginTop: 230,
    marginHorizontal: 100,
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    color: "#ebebeb",
    backgroundColor: Color.primary,
  },
});
