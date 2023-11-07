import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Agenda } from 'react-native-calendars';
import Color from '../Common/Color';
import Header from "./Header";
import NavbarButtom from '../Common/NavbarButtom';

const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValue, setSelectedValue] = useState('default');
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const navigation = useNavigation();
  const availableTimes = ['09:00 AM', '10:00 AM', '02:00 PM', '04:00 PM'];

  const onDatePicked = (day) => {
    setSelectedDate(day.dateString);
  };

  const openTimePicker = () => {
    setTimePickerVisible(true);
  };

  const closeTimePicker = () => {
    setTimePickerVisible(false);
  };

  const onTimeSelected = (time) => {
    setSelectedTime(time);
    closeTimePicker();
  };

  const onSubmitPressed = async () => {
    // Your submit logic here
  };

 
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.scrollView}>
          <View style={styles.root}>
            <Text style={styles.title}>Book an Appointment</Text>
  
            {/* "Select Date" with bottom border */}
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Select Date  </Text>
              <Icon name="ios-today" color={Color.primary} size={25} />
            </View>
  
            <View style={styles.pickerContainer}>
              <Agenda
                onDayPress={onDatePicked}
                markedDates={{
                  [selectedDate]: { selected: true, marked: true },
                }}
                theme={{
                  backgroundColor: 'white',
                  calendarBackground: 'white',
                  selectedDayBackgroundColor: Color.primary,
                  selectedDayTextColor: 'white',
                }}
              />
            </View>
  
            {/* "Select Time" with bottom border */}
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Select Time  </Text>
              <Icon name="time" color={Color.primary} size={25} />
            </View>
  
            <View style={styles.timeListContainer}>
              {/* Display available times side by side */}
              <FlatList
                data={availableTimes}
                keyExtractor={(item) => item}
                 // Display two items per row
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.timeItem}
                    onPress={() => onTimeSelected(item)}
                  >
                    <Text style={styles.timeText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
  
            <TouchableOpacity style={styles.submitButton} onPress={onSubmitPressed}>
              <Text style={styles.submitButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <NavbarButtom onChange={(selectedIcon) => console.log(selectedIcon)}/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:Color.secondary,
    },
    scrollView: {
      flex: 1,
    },
    root: {
      alignItems: 'center',
      padding: 20,
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: Color.primary,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1, // Add a bottom border
      borderBottomColor: Color.primary, // Border color
      marginBottom: 20,
      padding:10
    },
    sectionTitle: {
      
      fontSize: 20,
      color: Color.background,
    },
    pickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
    },
    timeListContainer: {
      width: '100%',
      marginBottom: 20,
      flexDirection: 'row', 
      flexWrap: 'wrap',
    },
    timeItem: {
      backgroundColor: Color.primary,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginLeft: 10,
      marginBottom: 10,
      width: '45%', 
    },
    timeText: {
      fontSize: 15,
      color: Color.secondary,
      fontWeight: 'bold',
    },
    submitButton: {
      backgroundColor: Color.primary,
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      width: '100%',
    },
    submitButtonText: {
      fontSize: 18,
      color: Color.secondary,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  export default BookingScreen;
