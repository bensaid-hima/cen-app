import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { saveArticle, removeArticle, isArticleSaved } from '../storage/savedArticles'

export default function BottomStatBar({
  article,
  onOpenComments,
}: {
  article: any
  onOpenComments: () => void
}) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    checkIfSaved()
  }, [])

  const checkIfSaved = async () => {
    const alreadySaved = await isArticleSaved(article.url)
    setSaved(alreadySaved)
  }

  const handleToggleSave = async () => {
    if (saved) {
      await removeArticle(article.url)
    } else {
      await saveArticle({ ...article, savedAt: Date.now() })
    }
    setSaved(!saved)
  }

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

      <TouchableOpacity style={styles.statItem} onPress={handleToggleSave}>
        <FontAwesome name={saved ? 'bookmark' : 'bookmark-o'} size={20} color="#111" />
        <Text style={styles.statText}>{saved ? 'Saved' : 'Save'}</Text>
      </TouchableOpacity>

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
