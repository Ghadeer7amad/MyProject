import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import React from "react";
import Color from "../Common/Color.js";

const Categories = ({ onChange }) => {
  const [selectedText, setSelectedText] = useState(null);

  const handleTextPress = (text) => {
    setSelectedText(text);
  };

  return (
    <View style={styles.TextTopStyle}>
      <TouchableOpacity onPress={() => handleTextPress("Body")}>
        <Text
          style={[
            styles.StyleBodyText,
            selectedText === "Body" && {
              color: "#d9b650",
              borderBottomWidth: 2,
              borderBottomColor: "#d9b650",
            },
          ]}
        >
          Body
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTextPress("Face")}>
        <Text
          style={[
            styles.StyleFaceText,
            selectedText === "Face" && {
              color: "#d9b650",
              borderBottomWidth: 2,
              borderBottomColor: "#d9b650",
            },
          ]}
        >
          Face
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  TextTopStyle: {
    flexDirection: "row",
    padding: 20,
  },
  StyleBodyText: {
    marginRight: 60,
    fontSize: 25,
    color: Color.secondary,
  },
  StyleFaceText: {
    fontSize: 25,
    color: Color.secondary,
  },
});
