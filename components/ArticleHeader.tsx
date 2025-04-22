"use client"

import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"

interface ArticleHeaderProps {
  title: string
  onBack: () => void
  onShare: () => void
}

export default function ArticleHeader({ title, onBack, onShare }: ArticleHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="chevron-back" size={26} color="#111" />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onShare}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.actionButton}
        >
          <Feather name="share" size={20} color="#111" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Feather name="more-horizontal" size={22} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 55 : 45,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 6,
    marginLeft: 8,
  },
})
