import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
  Appearance,
} from "react-native";
import One from "../../assets/profile.jpg";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Color from "../Common/Color.js";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../Common/Spacing.js";
import NavbarButtom from "../Common/NavbarButtom";

import { useTranslation } from "react-i18next";

export default function Example() {
  const [t, i18n] = useTranslation();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const {
    id: userId,
    name: userName,
    email: userEmail,
  } = useSelector((state) => state.user.userData);
  const { role } = useSelector((state) => state.user.userData);

  const baseUrl = "https://ayabeautyn.onrender.com";

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/signin`);
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

  const [form, setForm] = React.useState({
    darkMode: true,
    wifi: false,
    showCollaborates: true,
    accessibillityMode: false,
  });

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const SECTIONS = [
    {
      icon: "settings",
      items: [
        {
          id: "language",
          icon: "globe",
          color: "#fe9400",
          label: t("Language"),
          type: "link",
        },
        {
          id: "Favorites",
          icon: "heart",
          color: "#f95959",
          label: t("Favorites"),
          type: "link",
        },
        {
          id: "My Appointments",
          icon: "calendar",
          color: "#807afe",
          label: t("My Appointments"),
          type: "link",
        },
        {
          id: "Notifications",
          icon: "bell",
          color: "#32c795",
          label: t("Notifications"),
          type: "link",
        },
      ],
    },

    {
      icon: "help-circle",
      items: [
        {
          id: "Log Out",
          icon: "log-out",
          color: "#a07afe",
          label: t("Log Out"),
          type: "link",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={{ marginLeft: Spacing * 2, marginTop: Spacing * 3 }}
          onPress={() => {
            navigation.navigate("MainScreen2");
          }}
        >
          <Ionicons
            name="arrow-back"
            color={Color.primary}
            size={Spacing * 2}
          />
        </TouchableOpacity>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt="Profile Picture"
                source={One}
                style={styles.profileAvatar}
              />
              <View style={styles.profileAction}>
                <FeatherIcon name="edit-3" size={15} color={Color.primary} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileAddress}>{userEmail}</Text>
        </View>

        {SECTIONS.map(({ header, items }) => {
          return (
            <View style={styles.section} key={header}>
              <Text style={styles.sectionHeader}>{header}</Text>

              {items.map(({ id, label, type, icon, color, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (id === "language") {
                        setLanguageModalVisible(true);
                      } else if (id === "Favorites") {
                        navigation.navigate("Favorite");
                      } else if (id === "Log Out") {
                        navigation.navigate("Homee");
                      } else if (id === "My Appointments") {
                        if (role === "Admin" || role === "Manager") {
                          navigation.navigate("AppointmentHistory");
                        } else {
                          navigation.navigate("UserHistory");
                        }
                      } else {
                      }
                    }}
                  >
                    <View style={styles.row}>
                      <View
                        style={[styles.rowIcon, { backgroundColor: color }]}
                      >
                        <FeatherIcon name={icon} color="#fff" size={18} />
                      </View>
                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={{ flex: 1 }} />

                      {type === "link" && (
                        <FeatherIcon
                          name="chevron-right"
                          color="#0c0c0c"
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}

        <Modal
          animationType="slide"
          transparent={true}
          visible={languageModalVisible}
          onRequestClose={() => {
            setLanguageModalVisible(!languageModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t("Select Language")}</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setSelectedLanguage("Arabic");
                  i18n.changeLanguage("ar");
                  setLanguageModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>{t("Arabic")}</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setSelectedLanguage("English");
                  i18n.changeLanguage("en");
                  setLanguageModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>{t("English")}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: "white",
  },

  profile: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#393e46",
    textAlign: "center",
  },

  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },

  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },

  profileAvatarWrapper: {
    position: "relative",
  },

  profileAction: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#f2f2f2",
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },

  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
  },

  rowLabel: {
    fontSize: 17,
    color: "#0c0c0c",
  },

  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: "80%",
  },
  buttonClose: {
    backgroundColor: Color.background,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
