import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import registerNNPushToken from "native-notify";
import Icon from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import Color from "../Common/Color";
import Header from "./Header";
import NavbarButtom from "../Common/NavbarButtom";
import { Select } from "native-base";
import { useSelector } from "react-redux";
import { Box, useToast } from "native-base";
import WhatsApp from "../Common/WhatsApp";
import { useTranslation } from "react-i18next";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";

const screenwidth = Dimensions.get("window").width;

const BookingScreen = () => {
  const toast = useToast();
  const [t] = useTranslation();

  const navigation = useNavigation();
  const { userData, usedSalonData } = useSelector((state) => state.user);
  const { id: userId, name: userName } = userData;
  const { id: salonId, name: salonName } = useSelector(
    (state) => state.user.usedSalonData
  );

  const generateAvailableTimes = () => {
    const startHour = 8;
    const endHour = 20;
    const intervalMinutes = 30;

    const availableTimes = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const timeString = `${formattedHour}:${formattedMinute}`;
        availableTimes.push(timeString);
      }
    }

    return availableTimes;
  };

  const availableTimes = generateAvailableTimes();

  const [services, setServices] = useState([]);
  const [selectedValue, setSelectedValue] = useState(
    services.length > 0 ? services[0].name : null
  );
  const baseUrl = "https://ayabeautyn.onrender.com";

  useEffect(() => {
    fetch(`${baseUrl}/salons/${salonId}/services/getServices`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.Services);
        setIsLoading(false);
        if (data.Services.length > 0) {
          setSelectedValue(data.Services[0].name);
        }
      })
      .catch((error) => console.log("Error from favs screen: ", error.message));
  }, []);

  const theme = {
    backgroundColor: Color.background,
    calendarBackground: Color.secondary,
    selectedDayBackgroundColor: Color.background,
    selectedDayTextColor: Color.secondary,
    todayTextColor: Color.primary,
    dotColor: Color.secondary,
    selectedDotColor: Color.primary,
    arrowColor: "black",
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/salons/${salonId}/Appointment/appointment`
      );
      const data = await response.json();
      setBookedAppointments(data.map((appointment) => appointment.uniqueDate));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        if (salonId) {
          const response = await fetch(
            `${baseUrl}/salons/salon/${salonId}/branches`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Data received:", data);

          if (data) {
            setBranches(data);
          } else {
            console.error("Invalid data structure:", data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, [salonId]);

  const isSlotAvailable = (date, time, service, branch) => {
    const uniqueDate = date + time + service + branch;
    return !bookedAppointments.includes(uniqueDate);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const onTimeSelected = (time) => {
    const uniqueDateTimeServiceBranch =
      selectedDate + time + selectedValue + selectedBranch;

    if (isSlotAvailable(selectedDate, time, selectedValue, selectedBranch)) {
      setSelectedTime(time);
    } else {
      toast.show({
        render: () => (
          <Box bg="#c81912" px="5" py="5" rounded="sm" mb={5}>
            {t("Booked")}
          </Box>
        ),
      });
    }
  };

  const timeItemStyles = {
    backgroundColor: Color.background,
    borderRadius: 50,
    padding: 20,
    marginLeft: 10,
    marginBottom: 10,
    width: 84,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
  };

  const timeTextStyles = {
    fontSize: 13,
    color: Color.secondary,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  };

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
    } else {
      alert("Must use a physical device for Push Notifications");
    }

    setExpoPushToken(token.data);
    return token.data;
  };

  const sendPushNotification = async (expoPushToken) => {
    const notificationData1 = {
      expoPushToken,
      title: `${salonName}: Appointment Booked 🎉`,
      body: `Hello, ${userName}! Your appointment is booked successfully! We look forward to seeing you!`,
      data: { someData: "goes here" },
      salonId: salonId,
      userId: userId,
    };
    
    const notificationData2 = {
      expoPushToken,
      title: `New Appointment Booked 🎉`,
      body: `${userName} has booked an appointment at your salon!`,
      data: { someData: "goes here" },
      salonId: salonId,
      userId: userId,
    };
    
    try {
      const backendResponse1 = await fetch(
        `${baseUrl}/notifications/notification`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData1),
        }
      );
    
      if (!backendResponse1.ok) {
        throw new Error(`Backend Error: ${backendResponse1.statusText}`);
      }
    
      const backendResponse2 = await fetch(
        `${baseUrl}/notifications/notification`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData2),
        }
      );
    
      if (!backendResponse2.ok) {
        throw new Error(`Backend Error: ${backendResponse2.statusText}`);
      }
    } catch (backendError) {
      console.error(
        "Error sending notification to the backend:",
        backendError.message
      );
    }

    const expoMessage = {
      to: expoPushToken,
      sound: "default",
      title: `${salonName}: Appointment Booked 🎉`,
      body: `Hello, ${userName}! Your appointment is booked successfully! We look forward to seeing you!`,
      data: { someData: "goes here" },
    };

    try {
      const expoResponse = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expoMessage),
      });

      if (!expoResponse.ok) {
        throw new Error(`Expo Error: ${expoResponse.statusText}`);
      }
    } catch (expoError) {
      console.error("Error sending notification to Expo:", expoError.message);
    }
  };
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const confirmBooking = () => {
    Alert.alert(
      t("Confirm booking"),
      t("Are you sure you want to book this appointment?"),
      [
        {
          text: t("Cancel"),
          style: "cancel",
        },
        {
          text: t("Yes, Confirm"),
          onPress: () => onSubmitPressed(),
        },
      ],
      { cancelable: false }
    );
  };

  const onSubmitPressed = async () => {
    const data = {
      user_id: userId,
      user_name: userName,
      branch: selectedBranch,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      uniqueDate: selectedDate + selectedTime + selectedValue + selectedBranch,
      serviceType: selectedValue,
      SalonId: salonId,
    };

    try {
      const response = await fetch(`${baseUrl}/appointments/appointment`, {
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
        console.log("appointment details", json);

        setBookedAppointments([...bookedAppointments, data.uniqueDate]);
        sendPushNotification(expoPushToken);

        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
                {t("Your appointment is booked successfully")}
              </Box>
            );
          },
        });
        navigation.navigate("PathologicalCase");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <WhatsApp />

      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.root}>
          <Text style={styles.title}>{t("Book an Appointment")}</Text>

          <View style={styles.pickerContainer}>
            <Calendar
              theme={theme}
              onDayPress={(day) => onDateChange(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                },
              }}
            />
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t("Select Service")} </Text>
            <Icon name="star" color={Color.background} size={25} />
          </View>

          <View style={styles.serviceListContainer}>
            <Select
              placeholder={t("Select Service")}
              style={{ width: 150, fontSize: 18 }}
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              {services.map((item) => (
                <Select.Item
                  key={item._id}
                  label={item?.name}
                  value={item.name}
                />
              ))}
            </Select>
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t("Select Branch")} </Text>
            <Icon name="star" color={Color.background} size={25} />
          </View>
          <View style={styles.serviceListContainer}>
            <Select
              placeholder={t("Select Branch")}
              style={{ width: 150, fontSize: 18 }}
              selectedValue={selectedBranch}
              onValueChange={(itemValue) => setSelectedBranch(itemValue)}
              accessibilityLabel="Select Branch"
            >
              {branches.map((item, index) => (
                <Select.Item
                  key={`${item}_${index}`}
                  label={item}
                  value={item}
                />
              ))}
            </Select>
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t("Select Time")} </Text>
            <Icon name="time" color={Color.background} size={25} />
          </View>

          <ScrollView
            snapToInterval={screenwidth}
            decelerationRate="fast"
            alwaysBounceHorizontal={true}
            horizontal
          >
            <View style={styles.timeListContainer}>
              {availableTimes.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    timeItemStyles,
                    selectedTime === item && styles.selectedTimeItem,
                    !isSlotAvailable(
                      selectedDate,
                      item,
                      selectedValue,
                      selectedBranch
                    ) && {
                      opacity: 0.5,
                    },
                  ]}
                  onPress={() => onTimeSelected(item)}
                  disabled={
                    !isSlotAvailable(
                      selectedDate,
                      item,
                      selectedValue,
                      selectedBranch
                    )
                  }
                >
                  <Text
                    style={[
                      timeTextStyles,
                      selectedTime === item && styles.selectedTimeText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={confirmBooking}
          >
            <Text style={styles.submitButtonText}>{t("Send")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  scrollView: {
    flex: 1,
  },
  root: {
    alignItems: "center",
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Color.primary,
  },
  sectionTitleContainer: {
    alignSelf: "flex-start",

    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: Color.primary,
    marginBottom: 20,
    padding: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: Color.primary,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
  },
  timeListContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
  },
  timeItem: {
    backgroundColor: Color.background,
    borderRadius: 50,
    padding: 20,
    marginLeft: 10,
    marginBottom: 10,
    width: 84,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 15,
    color: Color.secondary,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  serviceListContainer: {
    width: "90%",
    marginBottom: 20,
  },

  submitButton: {
    backgroundColor: Color.primary,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    width: "100%",
  },
  submitButtonText: {
    fontSize: 18,
    color: Color.secondary,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedTimeItem: {
    backgroundColor: Color.secondary,
    borderWidth: 2,
    borderColor: Color.background,
  },
  selectedTimeText: {
    color: Color.background, // Text color for the selected time
  },
});

export default BookingScreen;
