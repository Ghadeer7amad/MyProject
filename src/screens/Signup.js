import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faCheck,
  faHome,
  faPhone,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../Common/Color.js";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../Common/Spacing.js";
import { Box, useToast, Toast } from "native-base";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();

  const toast = useToast();
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPasswordCValid, setPasswordCValid] = useState(true);
  const [fieldValid, setFieldValid] = useState({
    name: true,
    email: true,
    age: true,
    phone: true,
    address: true,
    password: true,
    passwordC: true,
  });
  const handleRegister = async () => {
    const errors = {};
    if (userName === "") {
      errors.name = false;
    }
    if (email === "") {
      errors.email = false;
    }
    if (age === "") {
      errors.birthday = false;
    }
    if (phone === "") {
      errors.phone = false;
    }
    if (address === "") {
      errors.address = false;
    }
    if (password === "") {
      errors.password = false;
    }
    if (confirmpassword === "") {
      errors.confirmpassword = false;
    }
    setFieldValid({ ...fieldValid, ...errors });

    // إذا كان هناك حقول غير صالحة، لا تقم بإرسال الطلب
    if (Object.values(errors).some((fieldValid) => !fieldValid)) {
      return;
    }
  };
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const onChangeNameHandler = (userName) => {
    setuserName(userName);
  };
  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };
  const onChangeAgeHandler = (age) => {
    setage(age);
  };
  const onChangePhoneHandler = (phone) => {
    setphone(phone);
  };
  const onChangeAddressHandler = (address) => {
    setaddress(address);
  };
  const onChangePasswordHandler = (password) => {
    setpassword(password);
  };
  const onChangeconfirmpasswordHandler = (confirmpassword) => {
    setconfirmpassword(confirmpassword);
  };
  const handleSignUpAndRegister = () => {
    handleSignUp();
    handleRegister();
  };
  const MyToast = ({ message, bgColor }) => {
    return (
      <Box px="8" py="5" rounded="sm" mb={5} bg={bgColor || "gray.500"}>
        <Text>{message}</Text>
      </Box>
    );
  };
  const showToast = (message, bgColor) => {
    Toast.show({
      render: () => <MyToast message={message} bgColor={bgColor} />,
    });
  };

  const baseUrl = "https://ayabeautyn.onrender.com";
  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, {
        userName,
        email,
        age,
        phone,
        address,
        password,
        confirmpassword,
      });
      if (response.status === 201) {
        toast.show({
          render: () => (
            <Box bg="#55a44e" px="8" py="5" rounded="sm" mb={5}>
              {t("SignUp successfully")}
            </Box>
          ),
        });
        setuserName("");
        setEmail("");
        setage("");
        setphone("");
        setaddress("");
        setpassword("");
        setconfirmpassword("");
        navigation.navigate("Login");
      } else {
        toast.show({
          render: () => (
            <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
              {t("SignUp failed")}
            </Box>
          ),
        });
        return;
      }
    } catch (error) {
      try {
        if (error.response && error.response.status === 404) {
          showToast(t("Email Exists, Use another email please"), "#c81912");
        }
      } catch (error) {
        toast.show({
          render: () => (
            <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
              {t("SignUp failed")}
            </Box>
          ),
        });
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPasswordC, setShowPasswordC] = useState(false);

  const togglePasswordVisibilityC = () => {
    setShowPasswordC(!showPasswordC);
  };

  return (
    <View style={styles.contanier}>
      <Text
        style={{
          color: Color.primary,
          fontSize: 25,
          fontWeight: "bold",
          marginLeft: 20,
          marginTop: 3,
          marginBottom: 1,
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: Spacing * 2, marginTop: Spacing * 3 }}
          onPress={() => {
            navigation.navigate("ChoseScreen");
          }}
        >
          <Ionicons
            name="arrow-back"
            color={Color.primary}
            size={Spacing * 2}
          />
        </TouchableOpacity>

        {t("Dear Lady")}
      </Text>

      <Text
        style={{
          color: Color.primary,
          fontSize: 17,
          marginLeft: 20,
          marginBottom: 3,
        }}
      >
        {t("please enter your complete information!!")}
      </Text>
      <View style={styles.formgroup}>
        <TextInput
          value={userName}
          onChangeText={onChangeNameHandler}
          onBlur={() => setFieldValid({ ...fieldValid, name: userName !== "" })}
          style={styles.input}
          placeholder={t("Enter Your Name")}
        />
        <FontAwesomeIcon icon={faUser} style={styles.icon} />
      </View>
      {!fieldValid.name && (
        <Text style={styles.textWrong}> {t("name is required")} </Text>
      )}

      <View style={styles.formgroup}>
        <TextInput
          value={email}
          onChangeText={onChangeEmailHandler}
          onBlur={() => setFieldValid({ ...fieldValid, email: email !== "" })}
          style={styles.input}
          placeholder="example@gmail.com"
        />
        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
      </View>
      {!fieldValid.email && (
        <Text style={styles.textWrong}> {t("email is required")} </Text>
      )}

      <View style={styles.formgroup}>
        <TextInput
          value={age}
          onChangeText={onChangeAgeHandler}
          onBlur={() => {
            const isValidAge =
              age !== "" && parseInt(age) >= 18 && parseInt(age) <= 50;
            setFieldValid({ ...fieldValid, age: isValidAge });
          }}
          style={styles.input}
          placeholder="18-50"
        />
        <FontAwesomeIcon icon={faBirthdayCake} style={styles.icon} />
      </View>
      {!fieldValid.age && age !== "" && parseInt(age) < 18 && (
        <Text style={styles.textWrong}> {t("Age must be 18 or more")} </Text>
      )}
      {!fieldValid.age && age !== "" && parseInt(age) > 50 && (
        <Text style={styles.textWrong}> {t("Age must be 50 or less")} </Text>
      )}
      {!fieldValid.age && age === "" && (
        <Text style={styles.textWrong}> {t("Age is required")} </Text>
      )}

      <View style={styles.formgroup}>
        <TextInput
          value={phone}
          onChangeText={onChangePhoneHandler}
          onBlur={() => {
            const isValidPhone = phone !== "" && /^05\d{8}$/.test(phone);
            setFieldValid({ ...fieldValid, phone: isValidPhone });
          }}
          style={styles.input}
          placeholder="+972 56-853-6463"
        />
        <FontAwesomeIcon icon={faPhone} style={styles.icon} />
      </View>
      {!fieldValid.phone && phone === "" && (
        <Text style={styles.textWrong}> {t("Phone is required")} </Text>
      )}
      {!fieldValid.phone && phone !== "" && !/^05\d{8}$/.test(phone) && (
        <Text style={styles.textWrong}> {t("Invalid phone format")} </Text>
      )}

      <View style={styles.formgroup}>
        <TextInput
          value={address}
          onChangeText={onChangeAddressHandler}
          onBlur={() =>
            setFieldValid({ ...fieldValid, address: address !== "" })
          }
          style={styles.input}
          placeholder={t("City/Village")}
        />
        <FontAwesomeIcon icon={faHome} style={styles.icon} />
      </View>
      {!fieldValid.address && (
        <Text style={styles.textWrong}> {t("address is required")} </Text>
      )}

      <View style={styles.formgroup}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={onChangePasswordHandler}
          onBlur={() => {
            setFieldValid({
              ...fieldValid,
              password: (password !== "") & (password.length >= 5),
            });
          }}
          style={styles.input}
          placeholder={t("Enter Your password")}
        />
        <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
          <Ionicons
            style={styles.iconEye}
            name={showPassword ? "eye" : "eye-off"}
            size={20}
          />
        </TouchableWithoutFeedback>
        <FontAwesomeIcon icon={faLock} style={styles.icon} />
      </View>
      {!fieldValid.password && (
        <Text style={styles.textWrong}>
          {" "}
          {t("Password must be at least 5 characters")}{" "}
        </Text>
      )}

      <View style={styles.formgroup}>
        <TextInput
          secureTextEntry={!showPasswordC}
          value={confirmpassword}
          onChangeText={onChangeconfirmpasswordHandler}
          onBlur={() => {
            setFieldValid({
              ...fieldValid,
              confirmpassword: confirmpassword !== "",
            });
            setPasswordCValid(password === confirmpassword);
          }}
          style={styles.input}
          placeholder={t("Confirm your Password")}
        />
        <TouchableWithoutFeedback onPress={togglePasswordVisibilityC}>
          <Ionicons
            style={styles.iconEye}
            name={showPasswordC ? "eye" : "eye-off"}
            size={20}
          />
        </TouchableWithoutFeedback>
        <FontAwesomeIcon icon={faCheck} style={styles.icon} />
      </View>
      {!fieldValid.passwordC && (
        <Text style={styles.textWrong}>
          {" "}
          {t("confirm password is required")}{" "}
        </Text>
      )}
      {!isPasswordCValid && (
        <Text style={styles.textWrong}>{t("Your Password not match")}</Text>
      )}

      <TouchableOpacity onPress={handleSignUpAndRegister}>
        <Text style={styles.buttonStyle}>{t("Sign Up")}</Text>
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
            <FontAwesomeIcon icon={faFacebookF} style={styles.iconsFacebook} />
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
        {" "}
        {t("Have An Account?")}
        <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
          {" "}
          {t("Log in your Account")}
        </Text>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  contanier: {
    marginTop: 55,
    height: "100%",
    width: "100%",
  },
  TextStyleHeader: {
    fontWeight: "500",
    color: Color.primary,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  formgroup: {
    display: "flex",
    position: "relative",
    marginTop: 10,
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
    borderColor: Color.background,
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
    marginTop: 20,
    marginBottom: 7,
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
    marginBottom: 10,
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
    marginBottom: 10,
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
    marginVertical: 14,
    marginTop: 1,
  },
  link: {
    color: Color.primary,
    fontWeight: "bold",
  },
  textWrong: {
    color: "#ff847c",
    marginLeft: 10,
  },
});
