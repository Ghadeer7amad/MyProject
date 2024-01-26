import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import Color from "../Common/Color";
import Header from "./Header";
import NavbarButtom from "../Common/NavbarButtom";
import { Select } from "native-base";
import { useSelector } from "react-redux";
import { Box, useToast } from "native-base";
import WhatsApp from "../Common/WhatsApp";
import { useTranslation } from 'react-i18next'; 

import { useNavigation } from "@react-navigation/native";

const screenwidth = Dimensions.get("window").width;

const BookingScreen = () => {
  const toast = useToast();
  const [t] = useTranslation();



  const navigation = useNavigation();
  const { userData, usedSalonData } = useSelector((state) => state.user);
  const { id: userId, name: userName } = userData;
  const { _id: salonId } = useSelector(
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
    fetch(`${baseUrl}/services/getServices`)
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
      const response = await fetch(`${baseUrl}/salons/${salonId}/Appointment/appointment`); 
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

  const isSlotAvailable = (date, time) => {
    const uniqueDate = date + time;
    return !bookedAppointments.includes(uniqueDate);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const onTimeSelected = (time) => {
    if (isSlotAvailable(selectedDate, time)) {
      setSelectedTime(time);
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="#c81912" px="5" py="5" rounded="sm" mb={5}>
              {t('book')}
            </Box>
          );
        },
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
    fontSize: 15,
    color: Color.secondary,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  };

  const onSubmitPressed = async () => { 
    const data = {
      user_id: userId,
      user_name: userName,
      branch: selectedBranch,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      uniqueDate: selectedDate + selectedTime,
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

        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="5" py="5" rounded="sm" mb={5}>
                {t('Your appointment is booked successfully')}
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
          <Text style={styles.title}>{t('Book an Appointment')}</Text>

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
            <Text style={styles.sectionTitle}>{t('Select Service')} </Text>
            <Icon name="star" color={Color.background} size={25} />
          </View>

          <View style={styles.serviceListContainer}>
            <Select
              placeholder={t('Select Service')}
              style={{ width: 150, fontSize: 18 }}
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              {services.map((item) => (
                <Select.Item
                  key={item.id}
                  label={item?.name}
                  value={item.name}
                />
              ))}
            </Select>
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t('Select Branch')} </Text>
            <Icon name="star" color={Color.background} size={25} />
          </View>
          <View style={styles.serviceListContainer}>
            <Select
              placeholder={t('Select Branch')}
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
            <Text style={styles.sectionTitle}>{t('Select Time')} </Text>
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
                    !isSlotAvailable(selectedDate, item) && { opacity: 0.5 },
                  ]}
                  onPress={() => onTimeSelected(item)}
                  disabled={!isSlotAvailable(selectedDate, item)}
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
            onPress={onSubmitPressed}
          >
            <Text style={styles.submitButtonText}>{t('Send')}</Text>
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
