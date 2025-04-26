"use client"

import { View, Text, StyleSheet, ImageBackground, Dimensions, Animated, Platform } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"

const screenWidth = Dimensions.get("window").width
const HEADER_HEIGHT = Platform.OS === "ios" ? 90 : 80

interface HeroImageProps {
  imageUrl: string
  tag: string
  scrollY: Animated.Value
}

export default function HeroImage({ imageUrl, tag, scrollY }: HeroImageProps) {
  // Parallax effect for the image
  const imageTranslateY = scrollY.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [50, 0, -50],
    extrapolate: "clamp",
  })

  // Scale effect for the image
  const imageScale = scrollY.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1.2, 1, 0.9],
    extrapolate: "clamp",
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{ translateY: imageTranslateY }, { scale: imageScale }],
          },
        ]}
      >
        <ImageBackground
          source={{ uri: imageUrl || "https://via.placeholder.com/800x500?text=No+Image" }}
          style={styles.image}
          imageStyle={styles.imageRounded}
        >
          <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]} style={styles.gradient} />

          {/* <View style={styles.tagContainer}>
            <BlurView intensity={80} tint="dark" style={styles.blurView}>
              <Text style={styles.tagText}>{tag}</Text>
            </BlurView>
          </View> */}
        </ImageBackground>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    marginTop: HEADER_HEIGHT,
    overflow: "hidden",
  },
  imageContainer: {
    height: 280,
    width: screenWidth,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  imageRounded: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tagContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    overflow: "hidden",
    borderRadius: 20,
  },
  blurView: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  tagText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
})
