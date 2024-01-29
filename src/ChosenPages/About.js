import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import Header from "../screens/Header";
import Color from "../Common/Color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require("../../assets/hh.jpg"),
    require("../../assets/oo.jpg"),
    require("../../assets/hhhh.jpg"),
  ];

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const windowWidth = Dimensions.get("window").width;

  const navigation = useNavigation();
  const {
    id: salonId,
    name: salonName,
    branches: Branch,
  } = useSelector((state) => state.user.usedSalonData);
  const [t] = useTranslation();

  const handleBookPress = () => {
    navigation.navigate("BookingScreen");
  };

  const handleContactPress = () => {
    // Handle contact button press
    console.log("Contact us pressed");
  };

  const openWhatsAppChat = () => {
    const whatsappNumber = "+972595671000";
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;
    Linking.openURL(url);
  };

  const socialIcons = [
    {
      name: "facebook",
      icon: "facebook-f",
      color: "#1877f2",
      link: "https://www.facebook.com/aya.beauty.villa1?locale=ar_AR&paipv=0&eav=Afaw8ARYkvdMVws5MTn3LPhYLe4UDWzmlm457FhA5iKZt9ZWEv6qJ46CHCvluDalsIw&_rdr",
    },
    {
      name: "instagram",
      icon: "instagram",
      color: "#e4405f",
      link: "https://www.instagram.com/ayabeautyctr/?igsh=MXhidXR0OWx0aWducw%3D%3D",
    },
    {
      name: "whatsapp",
      icon: "whatsapp",
      color: "#25d366",
      link: "https://api.whatsapp.com/send?phone=+972595671000",
    },
  ];

  const locationIcon = "map-marker-alt";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />

        <View style={styles.sliderContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.floor(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width
              );
              handleSlideChange(slideIndex);
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={[styles.image, { width: windowWidth, height: 300 }]}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === currentIndex ? "#ffa952" : "#D1D1D1",
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}> {salonName} Center</Text>
          <View style={styles.titleLine} />
        </View>

        <Text style={styles.paragraph}>{t("aboutus")}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { borderColor: Color.primary }]}
            onPress={openWhatsAppChat}
          >
            <Text style={[styles.buttonText, { color: Color.primary }]}>
              {t("Contact Us")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Color.primary }]}
            onPress={handleBookPress}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              {t("Book an Appointment")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.DepartmentTitle}>
            {t("Departments of")} {salonName} Center
          </Text>
          <View style={styles.titleLine} />
        </View>

        <View style={styles.departmentContainer}>
          <View style={styles.imageContainer}>
            <Image
              alt="Profile Picture"
              source={require("../../assets/beauty.jpg")}
              style={styles.circularImage}
            />
          </View>
          <Text style={styles.departmentTitle}>{t("Skin Care")} </Text>
          <View style={styles.horizontalLine} />
          <Text style={styles.departmentParagraph}>{t("aboutskincare")}</Text>
        </View>

        <View style={styles.departmentContainer}>
          <View style={styles.imageContainer}>
            <Image
              alt="Profile Picture"
              source={require("../../assets/lazer.jpg")}
              style={styles.circularImage}
            />
          </View>
          <Text style={styles.departmentTitle}>{t("Laser Therapy")}</Text>
          <View style={styles.horizontalLine} />
          <Text style={styles.departmentParagraph}>{t("aboutlaser")}</Text>
        </View>

        <View style={styles.departmentContainer}>
          <View style={styles.imageContainer}>
            <Image
              alt="Profile Picture"
              source={require("../../assets/creem.jpg")}
              style={styles.circularImage}
            />
          </View>
          <Text style={styles.departmentTitle}>{t("Creams")} </Text>
          <View style={styles.horizontalLine} />
          <Text style={styles.departmentParagraph}>{t("aboutcream")}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t("Our Branches")}</Text>
          <View style={styles.title2Line} />
        </View>

        <View style={styles.branchContainer}>
          <View style={styles.branchDetails}>
            <FontAwesome5 name={locationIcon} size={15} color={Color.primary} />
            <Text style={styles.branchInfo}>{Branch} </Text>
          </View>
        </View>

        <View style={styles.socialIconsBackground}>
          {socialIcons.map((socialIcon, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.socialIcon]}
              onPress={() => Linking.openURL(socialIcon.link)}
            >
              <FontAwesome5 name={socialIcon.icon} size={20} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  sliderContainer: {
    height: 310,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: -50,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginVertical: 10,
    color: Color.primary,
    textTransform: "uppercase",
    marginTop: 15,
    textShadowColor: Color.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  titleLine: {
    width: 340,
    height: 0.5,
    backgroundColor: "gray",
    marginTop: 5,
  },

  title2Line: {
    width: 220,
    height: 0.5,
    backgroundColor: "gray",
    marginTop: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 20,
    marginTop: 15,
    textAlign: "center",
    color: Color.background,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderColor: Color.primary,
  },
  buttonText: {
    fontSize: 16,
  },
  departmentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    marginTop: 30,
  },
  circularImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 1,
  },
  departmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffa952",
  },
  horizontalLine: {
    width: 220,
    height: 0.4,
    backgroundColor: "gray",
    marginTop: 5,
  },
  departmentParagraph: {
    textAlign: "center",
    marginHorizontal: 20,
    color: "gray",
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 14,
  },
  DepartmentTitle: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
    color: Color.primary,
    textTransform: "uppercase",
    marginTop: 40,
    textShadowColor: Color.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  branchContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
  },

  branchDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  branchInfo: {
    marginLeft: 5,
    color: "gray",
  },

  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  socialIcon: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.yell,
    shadowColor: "#800080", // Same as the background color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderColor: Color.primary,
    borderWidth: 0.2,
  },

  socialIconsBackground: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderWidth: 0.2, // Add a small border
    borderColor: "rgba(0, 0, 0, 0.1)", // Color of the border
    elevation: 5,
  },
});

export default About;
