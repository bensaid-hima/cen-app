import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function ArticleMeta({
  title,
  author,
  date,
}: {
  title: string
  author: string
  date: string
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.metaRow}>
        <FontAwesome name="user-circle-o" size={22} color="#555" style={{ marginRight: 8 }} />
        <Text style={styles.metaText}>{author}</Text>
        <Text style={styles.metaDot}>•</Text>
        <Text style={styles.metaText}>{date}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    lineHeight: 30,
    marginBottom: 12,
    textAlign: 'left',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  metaDot: {
    fontSize: 12,
    marginHorizontal: 6,
    color: '#888',
  },
})
