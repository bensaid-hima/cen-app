"use client"

import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ArticleMetaProps {
  title: string
  author: string
  date: string
  readingTime: number
  source: string
}

export default function ArticleMeta({ title, author, date, readingTime, source }: ArticleMetaProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
      return new Date(dateString).toLocaleDateString("en-US", options)
    } catch (e) {
      return dateString
    }
  }

  // Check if author is the same as source to avoid duplication
  const showAuthor = author !== source

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.metaRow}>
        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar}>
            <Text style={styles.authorInitial}>{showAuthor ? author.charAt(0) : source.charAt(0)}</Text>
          </View>
          <View>
            {/* Show either author or source, not both if they're the same */}
            <Text style={styles.authorName}>{showAuthor ? author : source}</Text>
            <View style={styles.dateContainer}>
              {/* Only show source here if it's different from author */}
              {showAuthor && <Text style={styles.sourceText}>{source}</Text>}
              {showAuthor && <Text style={styles.dotSeparator}>•</Text>}
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.readTimeContainer}>
          <Feather name="clock" size={14} color="#666" />
          <Text style={styles.readTimeText}>{readingTime} min read</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    lineHeight: 32,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#B40000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  authorInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  authorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 2,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sourceText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  dotSeparator: {
    fontSize: 13,
    color: "#888",
    marginHorizontal: 6,
  },
  dateText: {
    fontSize: 13,
    color: "#666",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  readTimeText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
    fontWeight: "500",
  },
})
