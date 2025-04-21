import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'

type HighlightProps = {
  tag: string
  title: string
  imageUrl: string
}

const screenWidth = Dimensions.get('window').width

export default function HighlightCard({ tag, title, imageUrl }: HighlightProps) {
  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.card}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.85,
    height: 220,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // dark overlay
  },
  textContainer: {
    padding: 16,
  },
  tag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFDDDD',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
})
