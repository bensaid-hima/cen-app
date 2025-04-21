import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const screenWidth = Dimensions.get('window').width

export default function HeroImage({ imageUrl, tag }: { imageUrl: string, tag: string }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageRounded}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)']}
          style={styles.gradient}
        />
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  image: {
    width: screenWidth - 32,
    height: 220,
    justifyContent: 'flex-end',
  },
  imageRounded: {
    borderRadius: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  tag: {
    backgroundColor: '#B40000',
    alignSelf: 'flex-end',
    marginBottom: 12,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
})
