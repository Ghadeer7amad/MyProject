import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";




const Listt = () => {

  const navigation = useNavigation();

  

  return (
    <View style={styles.container}>
      <Text> HOME </Text>
      <Text> ABOUT </Text>
      <Text> SETTINGS </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#856c8b'
  },
  
});

export default Listt;
