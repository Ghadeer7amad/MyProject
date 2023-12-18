import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const Advice = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    require("../../assets/new.jpg"),
    require("../../assets/new.jpg"),
    require("../../assets/new.jpg"),
    require("../../assets/new.jpg"),
  ];

  const texts = [
    "- Avoid tanning products and direct exposure to the sun Before and after the session for 7 days.\n\n- Avoid chemical peeling for two weeks before the laser session and for a period of time 5 days later.",
    "- Avoid warm showers and saunas for two days after the session.\n\n- Do hair removal with a shaving razor before the session 48 hours.",
    "- Avoid using scented creams, scrubbing creams or perfumes Directly on the body after the session for 48 hours.\n\n- Commit to the session dates every 3-4 weeks during the course of treatment So you can get a better result.",
    "- Use cold compresses and prescribed skin conditioners Through the doctor to soothe the skin after the session for 3 days.",
  ];


  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const windowWidth = Dimensions.get("window").width;

  return (
      <ScrollView>
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
              <View key={index} style={{ width: windowWidth, height: 900 }}>
              <Image
                source={image}
                style={[styles.image, { width: "100%", height: "100%" }]}
                resizeMode="cover"
              />
              <Text style={styles.Textstyle}>Pre-laser tips ...</Text>
              <Text style={styles.imageText}>{texts[index]}</Text>
            </View>
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
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    sliderContainer: {
      height: '100%'
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
    imageText: {
        position: 'absolute',
        color: 'black',
        fontSize: 18,
        padding: 20,
        lineHeight: 30,
        letterSpacing: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        bottom: 200
      },
      Textstyle:{
        position: 'absolute',
        color: 'black',
        fontSize: 24,
        padding: 20,
        lineHeight: 30,
        letterSpacing: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        bottom: 700
      }
      
  });
  
export default Advice;
