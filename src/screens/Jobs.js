import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../Common/Color.js';
import Spacing from '../Common/Spacing.js';

const Jobs = () => {
  const navigation = useNavigation();

  // بيانات الوظائف
  const jobData = [
    {
      id: 1,
      title: 'Software Developer',
      description: 'Create amazing software solutions.',
      image: require('../../assets/11.jpg'),
    },
    {
      id: 2,
      title: 'Graphic Designer',
      description: 'Design stunning graphics and visuals.',
      image: require('../../assets/11.jpg'),
    },
    {
      id: 3,
      title: 'Marketing Specialist',
      description: 'Promote products and reach wider audiences.',
      image: require('../../assets/11.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginLeft: Spacing * 2, marginTop: Spacing * 3 }}
        onPress={() => {
          navigation.navigate('MainJob');
        }}
      >
        <Ionicons name="arrow-back" color={Color.primary} size={Spacing * 2} />
      </TouchableOpacity>

      <View style={styles.container1}></View>
      <ScrollView>
        <Text style={styles.textHeader}>Here are the jobs</Text>
        <Text style={styles.textHeader1}>we currently have available</Text>

        {/* إضافة بطاقات الوظائف */}
        {jobData.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.jobCard}
            onPress={() => {
              // يمكنك أدراج السلوك المرتبط بالنقر على البطاقة هنا
            }}
          >
            <Image source={job.image} style={styles.jobImage} resizeMode="cover" />
            <View style={styles.jobDetails}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobDescription}>{job.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1: {
    flexDirection: 'row',
    paddingTop: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 15,
  },
  textHeader1: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginLeft: 15,
    color: Color.primary,
  },
  jobCard: {
    margin: Spacing,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5, // ظل البطاقة
  },
  jobImage: {
    height: 150,
    width: '100%',
  },
  jobDetails: {
    padding: Spacing,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jobDescription: {
    fontSize: 14,
    color: 'gray',
  },
});
