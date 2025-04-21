import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

export default function BottomStatBar({ onOpenComments }: { onOpenComments: () => void }) {
  const [liked, setLiked] = useState(false)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.statItem} onPress={() => setLiked(!liked)}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={20}
          color={liked ? '#B40000' : '#111'}
        />
        <Text style={styles.statText}>{liked ? '1.2k' : '1.1k'}</Text>
      </TouchableOpacity>

      <View style={styles.statItem}>
        <FontAwesome name="bookmark-o" size={20} color="#111" />
        <Text style={styles.statText}>330</Text>
      </View>

      <TouchableOpacity style={styles.statItem} onPress={onOpenComments}>
        <Ionicons name="chatbubble-outline" size={20} color="#111" />
        <Text style={styles.statText}>485</Text>
      </TouchableOpacity>

      <View style={styles.statItem}>
        <Ionicons name="share-outline" size={20} color="#111" />
        <Text style={styles.statText}>22</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontWeight: '600',
    fontSize: 14,
  },
})
