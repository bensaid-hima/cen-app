import React from 'react'
import { View, StyleSheet } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default function SkeletonArticleCard() {
  return (
    <SkeletonPlaceholder borderRadius={12}>
      <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.text1} />
        <View style={styles.text2} />
      </View>
    </SkeletonPlaceholder>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  text1: {
    marginTop: 10,
    width: '80%',
    height: 20,
  },
  text2: {
    marginTop: 6,
    width: '40%',
    height: 16,
  },
})
