"use client"

import { View, Text, StyleSheet, Platform, TouchableOpacity, Linking } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ArticleContentProps {
  description: string
  content: string
  author: string
  url?: string
}

export default function ArticleContent({ description, content, author, url }: ArticleContentProps) {
  // Generate paragraphs from content
  const generateParagraphs = () => {
    // If no content, use description
    if (!content) return [description]

    // Split content into paragraphs
    const contentText = content.replace(/\[.*?\]/g, "") // Remove [+123 chars]
    return contentText.split("\n").filter((p) => p.trim().length > 0)
  }

  const paragraphs = generateParagraphs()

  const handleReadMore = () => {
    if (url) {
      Linking.openURL(url)
    }
  }

  return (
    <View style={styles.container}>
      {/* Description as a lead paragraph */}
      <Text style={styles.leadParagraph}>{description}</Text>

      <View style={styles.divider} />

      {/* Content paragraphs */}
      {paragraphs.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}

      {/* Truncated content indicator */}
      {content && content.includes("[") && (
        <View style={styles.truncatedContainer}>
          <View style={styles.truncatedHeader}>
            <Feather name="alert-circle" size={18} color="#555" />
            <Text style={styles.truncatedTitle}>Content Preview</Text>
          </View>
          <Text style={styles.truncatedText}>
            This is a preview of the article. Continue reading on the publisher's website for the full content.
          </Text>
          {url && (
            <TouchableOpacity style={styles.readMoreButton} onPress={handleReadMore}>
              <Text style={styles.readMoreText}>Continue Reading</Text>
              <Feather name="arrow-right" size={16} color="#fff" style={styles.readMoreIcon} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  leadParagraph: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 28,
    color: "#333",
    marginBottom: 24,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 28,
    color: "#333",
    marginBottom: 24,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  truncatedContainer: {
    marginTop: 8,
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
  },
  truncatedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  truncatedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  truncatedText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 16,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#B40000",
    borderRadius: 8,
    alignSelf: "stretch",
  },
  readMoreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  readMoreIcon: {
    marginLeft: 8,
  },
})
