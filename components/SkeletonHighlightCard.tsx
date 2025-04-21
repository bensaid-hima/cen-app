import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming, useSharedValue } from 'react-native-reanimated'

const width = Dimensions.get('window').width * 0.8

export default function SkeletonHighlightCard() {
  const opacity = useSharedValue(0.3)

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.image} />
      <View style={styles.text} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    width,
    height: 200,
    marginRight: 16,
    backgroundColor: '#E1E9EE',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#E1E9EE',
  },
  text: {
    marginTop: 10,
    width: '60%',
    height: 20,
    backgroundColor: '#E1E9EE',
  },
})
