import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLock, faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import Color from "../../Common/Color.js";
import React, { useState } from "react";
import { Box, useToast } from "native-base";
import axios from "axios";

const ResetPassword = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [code, setcode] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const onChangePasswordHandler = (password) => {
    setpassword(password);
  };
  const onChangeconfirmpasswordHandler = (confirmpassword) => {
    setconfirmpassword(confirmpassword);
  };
  const onChangeCodeHandler = (code) => {
    setcode(code);
  };
  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const handleReset = async () => {
    const baseUrl = "https://ayabeautyn.onrender.com";
    try {
      const response = await axios.patch(`${baseUrl}/auth/forgetPassword`, {
        email,
        code,
        password,
        confirmpassword,
      });

      if (response.status === 200) {
        toast.show({
          render: () => (
            <Box bg="#55a44e" px="8" py="5" rounded="sm" mb={5}>
              The password has been modified successfully
            </Box>
          ),
        });
        setEmail("");
        setcode("");
        setpassword("");
        setconfirmpassword("");
        navigation.navigate("Login");
      } else {
        toast.show({
          render: () => (
            <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
              Something error
            </Box>
          ),
        });
        return;
      }
    } catch (error) {
      try {
        if (error.response && error.response.status === 409) {
          toast.show({
            render: () => (
              <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
                Password you used
              </Box>
            ),
          });
        }
        return;
      } catch (error) {
        toast.show({
          render: () => (
            <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
              Something error
            </Box>
          ),
        });
        return;
      }
      //console.error('Error:', error.message)
    }
  };

  return (
    <View style={styles.contanier}>
      <Image
        style={styles.contanier1}
        source={require("../../../assets/true1.jpg")}
      />
      <View style={styles.contanier2}>
        <Text style={styles.TextStyleHeader}>Reset password Confirmation</Text>

        <View style={styles.formgroup}>
          <TextInput
            value={email}
            onChangeText={onChangeEmailHandler}
            //onBlur={() => setFieldValid({ ...fieldValid, password: password !== "" })}
            style={styles.input}
            placeholder="Enter email"
          />
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={code}
            onChangeText={onChangeCodeHandler}
            //onBlur={() => setFieldValid({ ...fieldValid, password: password !== "" })}
            style={styles.input}
            placeholder="Enter Code"
          />
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={password}
            onChangeText={onChangePasswordHandler}
            //label = {<Text style={{}}>Email</Text>}
            //onBlur={() => setFieldValid({ ...fieldValid, password: password !== "" })}
            style={styles.input}
            placeholder="New Password"
          />
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            value={confirmpassword}
            onChangeText={onChangeconfirmpasswordHandler}
            //onBlur={() => setFieldValid({ ...fieldValid, passwordC: passwordC !== "" })}
            style={styles.input}
            placeholder="Confirm your Password"
          />
          <FontAwesomeIcon icon={faCheck} style={styles.icon} />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleReset();
          }}
        >
          <Text style={[styles.buttonStyle, styles.buttonStyle1]}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={[styles.buttonStyle, styles.buttonStyle2]}>
            back to login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  contanier: {
    width: "100%",
    height: "100%",
  },
  contanier1: {
    height: "23%",
    width: "100%",
    justifyContent: "center",
  },
  contanier2: {
    height: "77%",
    backgroundColor: "#f4f4f4",
  },
  TextStyleHeader: {
    fontWeight: "bold",
    color: Color.primary,
    fontSize: 30,
    marginBottom: 10,
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
    position: "absolute", // تحديد موقع الأيقونة بالنسبة لحقل النص
    color: Color.primary,
    marginHorizontal: 30, // المسافة من اليسار
    padding: 11,
  },
  input: {
    flex: 1, // استخدم flex لاستغلال المساحة المتاحة بالكامل لحقل النص
    borderBottomWidth: 1, // إضافة حدود لحقل النص
    paddingVertical: 2, // تضبيط المسافة الرأسية داخل حقل النص
    padding: 35,
    marginHorizontal: 10,
    //borderRadius: 20,
    borderColor: Color.primary,
    borderWidth: 2, // تحديد عرض الإطار
  },
  textWrong: {
    color: "#ff847c",
    marginLeft: 10,
  },
  buttonStyle: {
    padding: 20,
    marginBottom: 5,
    marginHorizontal: 10,
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 20,
    letterSpacing: 2,
  },
  buttonStyle1: {
    backgroundColor: Color.primary,
    color: "#fff",
    marginTop: 60,
  },
  buttonStyle2: {
    backgroundColor: "#fbeeff",
    color: Color.primary,
    marginTop: 3,
  },
  TextStyle: {
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 10,
    fontWeight: "300",
    fontSize: 20,
    textAlign: "center",
    color: Color.primary,
  },
});
