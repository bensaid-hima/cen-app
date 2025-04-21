import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TodayHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Center for Education News</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 55,
    paddingBottom: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
})
