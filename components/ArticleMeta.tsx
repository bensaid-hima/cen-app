import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.sourceRow}>
        <View style={styles.sourceTag}>
          <Text style={styles.sourceText}>{source}</Text>
        </View>
        <View style={styles.readTimeContainer}>
          <Feather name="clock" size={12} color="#666" />
          <Text style={styles.readTimeText}>{readingTime} min read</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar}>
            <Text style={styles.authorInitial}>{author.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{author}</Text>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    lineHeight: 28,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sourceTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  sourceText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTimeText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#B40000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  authorInitial: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#B40000",
    borderRadius: 20,
  },
  followText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
})
