"use client"

import { useEffect, useState, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { saveArticle, removeArticle, isArticleSaved } from "../storage/savedArticles"

interface BottomStatBarProps {
  article: any
  onOpenComments: () => void
  onShare: () => void
}

export default function BottomStatBar({ article, onOpenComments, onShare }: BottomStatBarProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(1100)
  const likeScale = useRef(new Animated.Value(1)).current
  const saveScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    checkIfSaved()
  }, [])

  const checkIfSaved = async () => {
    const alreadySaved = await isArticleSaved(article.url)
    setSaved(alreadySaved)
  }

  const handleToggleSave = async () => {
    // Animate the button
    Animated.sequence([
      Animated.timing(saveScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(saveScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()

    // Update the saved state
    if (saved) {
      await removeArticle(article.url)
    } else {
      await saveArticle({ ...article, savedAt: Date.now() })
    }
    setSaved(!saved)
  }

  const handleToggleLike = () => {
    // Animate the button
    Animated.sequence([
      Animated.timing(likeScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(likeScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()

    // Update the like state and count
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.statItem} onPress={handleToggleLike}>
        <Animated.View style={{ transform: [{ scale: likeScale }] }}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={22} color={liked ? "#B40000" : "#333"} />
        </Animated.View>
        <Text style={[styles.statText, liked && styles.statTextActive]}>{formatCount(likeCount)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statItem} onPress={handleToggleSave}>
        <Animated.View style={{ transform: [{ scale: saveScale }] }}>
          <FontAwesome name={saved ? "bookmark" : "bookmark-o"} size={20} color={saved ? "#B40000" : "#333"} />
        </Animated.View>
        <Text style={[styles.statText, saved && styles.statTextActive]}>{saved ? "Saved" : "Save"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statItem} onPress={onOpenComments}>
        <Ionicons name="chatbubble-outline" size={20} color="#333" />
        <Text style={styles.statText}>485</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statItem} onPress={onShare}>
        <Ionicons name="share-outline" size={20} color="#333" />
        <Text style={styles.statText}>Share</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  statTextActive: {
    color: "#B40000",
  },
})
