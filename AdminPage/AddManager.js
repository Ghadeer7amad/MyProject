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
import Color from "../src/Common/Color.js";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../src/Common/Spacing.js";
import { Box, useToast, Toast, Select } from "native-base";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const AddManager = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const [items, setItems] = useState([]);
  const { role, token } = useSelector((state) => state.user.userData);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const [selectedValue, setSelectedValue] = useState(null);
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
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/salons/salon`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Nada__${token}`,
        },
      });
      const data = await response.json();
      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/managers/manager`, {
        userName,
        email,
        age,
        phone,
        address,
        password,
        salonId: selectedValue,
      });
      if (response.status === 201) {
        toast.show({
          render: () => (
            <Box bg="#55a44e" px="8" py="5" rounded="sm" mb={5}>
              {t("Manager is added successfully")}
            </Box>
          ),
        });
        setuserName("");
        setEmail("");
        setage("");
        setphone("");
        setaddress("");
        setpassword("");
        navigation.navigate("SalonScreen", {salonId:null});
      } else {
        toast.show({
          render: () => (
            <Box bg="#c81912" px="8" py="5" rounded="sm" mb={5}>
              {t("Failed")}
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
      <Text style={styles.TextStyleHeader}>{t("Add Manager")}</Text>

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

      <View style={styles.serviceListContainer}>
        <Select
          placeholder={t("Select Salon")}
          style={{ width: 150, fontSize: 15 }}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {items.map((item) => (
            <Select.Item key={item.id} label={item?.name} value={item.id} />
          ))}
        </Select>
      </View>

      <TouchableOpacity onPress={handleSignUpAndRegister}>
        <Text style={styles.buttonStyle}>{t("Add Manager")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddManager;

const styles = StyleSheet.create({
  contanier: {
    marginTop: 55,
    height: "auto",
    width: "auto",
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
  buttonsStyle: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 115,
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
  TextStyleHeader: {
    fontWeight: "500",
    color: Color.primary,
    fontSize: 24,
    marginTop: 70,
    marginBottom: 5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  serviceListContainer: {
    width: "95%",
    marginBottom: 20,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderBottomWidth: 1, // إضافة حدود لحقل النص
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: Color.background,
    borderWidth: 2, // تحديد عرض الإطار
  },
});
