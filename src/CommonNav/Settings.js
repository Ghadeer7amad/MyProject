import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import One from "../Common/ah.jpg";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Color from "../Common/Color.js";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../Common/Spacing.js";

const SECTIONS = [
  {
    header: "Preferences",
    icon: "settings",
    items: [
      { icon: "globe", color: "#fe9400", label: "Language", type: "link" },
      {
        id: "darkMode",
        icon: "moon",
        color: "#807afe",
        label: "Dark Mode",
        type: "toggle",
      },
      {
        id: "wifi",
        icon: "wifi",
        color: "#807afe",
        label: "Use Wi-Fi",
        type: "toggle",
      },
      { icon: "navigation", color: "#32c795", label: "Location", type: "link" },
      {
        id: "showCollaborators",
        icon: "users",
        color: "#32c759",
        label: "Show collaborators",
        type: "toggle",
      },
      {
        id: "accessibilityMode",
        icon: "airplay",
        color: "#fd2d54",
        label: "Accessibility mode",
        type: "toggle",
      },
    ],
  },
  {
    header: "Help",
    icon: "help-circle",
    items: [
      { icon: "flag", color: "#8e8d91", label: "Report Bug", type: "link" },
      { icon: "mail", color: "#a07afe", label: "Contact Us", type: "link" },
    ],
  },
  {
    header: "Content",
    icon: "align-center",
    items: [
      { icon: "save", color: "#32c759", label: "Saved", type: "link" },
      { icon: "download", color: "#fd2d54", label: "Download", type: "link" },
    ],
  },
];

export default function Example() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  // Assuming your Redux store structure has 'name' and 'email' properties
  const { id: userId, name: userName, email: userEmail } = useSelector(
    (state) => state.user.userData
  );

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
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

              {items.map(({ id, label, type, icon, color }) => {
                return (
                  <TouchableOpacity
                    key={icon}
                    onPress={() => {
                      // Handle section item press
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

                      {type == "toggle" && (
                        <Switch
                          value={form[id]}
                          onValueChange={(value) =>
                            setForm({ ...form, [id]: value })
                          }
                          trackColor={{
                            false: "grey",
                            true: Color.background,
                          }}
                          thumbColor={form[id] ? Color.primary : "white"}
                        />
                      )}

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingVertical: 24,
    backgroundColor: 'white'
  },

  profile: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',

  }, 

  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: Color.primary,
    textAlign: 'center',
  },

  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',

  }, 

  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,

  },

  profileAvatarWrapper: {
    position: 'relative',
  },

  /////////////////////
  profileAction: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',

  },

  section: {
    paddingHorizontal: 24,
  },

  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,


  },

  rowLabel: {
    fontSize: 17,
    color: '#0c0c0c',


  },

  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,


  }

});