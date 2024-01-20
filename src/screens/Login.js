import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import { useNavigation } from "@react-navigation/native";
import { Box, useToast } from "native-base";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/user/userActions.js";
import { useTranslation } from "react-i18next";

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };
  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const navigation = useNavigation();
  const [t, i18n] = useTranslation();

  const handleLogin = async () => {
    const baseUrl = "https://ayabeautyn.onrender.com";
    try {
      const response = await axios.post(`${baseUrl}/auth/signin`, {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(storeCurrentUser(response.data));
        console.log("Login Response:", response.data.token);
        toast.show({
          render: () => (
            <Box bg="#55a44e" px="8" py="5" rounded="sm" mb={5}>
              {t("login successfully")}
            </Box>
          ),
        });
        setEmail("");
        setPassword("");
        navigation.navigate("SalonScreen");
      } else {
        toast.show({
          render: () => (
            <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
              {t("login failed")}
            </Box>
          ),
        });
        return;
      }
    } catch (error) {
      toast.show({
        render: () => (
          <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
            {t("Login Failed From email or password")}
          </Box>
        ),
      });
      return;
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.contanier}>
      <Image style={styles.contanier1} source={require("../../assets/3.jpg")} />

      <View style={styles.contanier2}>
        <Text style={styles.TextStyleHeader}>{t("welcome again")}</Text>

        <View style={styles.formgroup}>
          <TextInput
            value={email}
            onChangeText={onChangeEmailHandler}
            //onFocus={handlePasswordFocus}
            style={styles.input}
            placeholder={t("Enter Your Email")}
          />
          <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
        </View>

        <View style={styles.formgroup}>
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={onChangePasswordHandler}
            style={styles.input}
            placeholder={t("Enter Your password")}
          />
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
          <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
            <Ionicons
              style={styles.iconEye}
              name={showPassword ? "eye" : "eye-off"}
              size={20}
            />
          </TouchableWithoutFeedback>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
        >
          <Text style={styles.buttonStyle}>{t("log")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TextStylePassword}
          onPress={() => {
            navigation.navigate("ForgetPage");
          }}
        >
          <Text style={{ color: "gray" }}>{t("forget your password")}</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t("or with social media")}</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.buttonsStyle}>
          <View style={styles.buttonFacebook}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://facebook.com");
              }}
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                style={styles.iconsFacebook}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonGoogle}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://google.com");
              }}
            >
              <FontAwesomeIcon icon={faGoogle} style={styles.iconsGoogle} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonTiwtter}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://twitter.com");
              }}
            >
              <FontAwesomeIcon icon={faTwitter} style={styles.iconsTiwtter} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.TextStyle4}>
          {t("Do Not Have An Account?")}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup")}
          >
            {t("reg")}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  contanier: {
    width: "100%",
    height: "100%",
  },
  contanier1: {
    height: "35%",
    width: "100%",
  },
  contanier2: {
    height: "65%",
    width: "100%",
    backgroundColor: "#fff",
  },
  TextStyleHeader: {
    fontWeight: "500",
    color: Color.background,
    fontSize: 24,
    marginTop: 10,
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
    position: "absolute", // تحديد موقع الأيقونة بالنسبة لحقل النص
    color: Color.primary,
    marginHorizontal: 20, // المسافة من اليسار
    padding: 11,
  },
  iconEye: {
    position: "absolute", // تحديد موقع الأيقونة بالنسبة لحقل النص
    marginHorizontal: 370, // المسافة من اليسار
  },

  input: {
    flex: 1, // استخدم flex لاستغلال المساحة المتاحة بالكامل لحقل النص
    borderBottomWidth: 1, // إضافة حدود لحقل النص
    paddingVertical: 10, // تضبيط المسافة الرأسية داخل حقل النص
    padding: 50,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: Color.primary,
    borderWidth: 2, // تحديد عرض الإطار
  },

  TextStylePassword: {
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginVertical: 20,
    marginBottom: 20,
  },

  buttonStyle: {
    padding: 20,
    marginTop: 30,
    marginHorizontal: 10,
    backgroundColor: Color.primary,
    fontWeight: "300",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    borderRadius: 30,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerText: {
    flex: 1, // يأخذ المساحة المتاحة بشكل كامل
    textAlign: "center", // توسيط النص
    color: "gray",
  },
  dividerLine: {
    flex: 0.7, // يأخذ المساحة المتاحة بشكل كامل
    borderBottomColor: "black", // لون الخط
    borderBottomWidth: 0.5, // عرض الخط (بالنقاط)
  },
  buttonsStyle: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 115,
  },
  buttonFacebook: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4d727e",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  iconsFacebook: {
    fontSize: 14,
    color: "#fff",
    marginRight: 3,
  },

  buttonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.background,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  iconsGoogle: {
    fontSize: 14,
    color: "#fff",
    marginRight: 3,
  },

  buttonTiwtter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7fc5ca",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  iconsTiwtter: {
    fontSize: 14,
    color: "#fff",
    marginRight: 3,
  },
  TextStyle4: {
    marginHorizontal: 70,
    marginVertical: 20,
  },
  link: {
    color: Color.primary,
    fontWeight: "bold",
  },
});
