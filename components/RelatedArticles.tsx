"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { Feather } from "@expo/vector-icons"

// Mock related articles
const mockRelatedArticles = [
  {
    id: "1",
    title: "How AI is Transforming Education Assessment",
    image: "https://via.placeholder.com/300x200?text=AI+Education",
    source: "EdTech Today",
    date: "2023-05-15",
  },
  {
    id: "2",
    title: "The Rise of Microlearning in Professional Development",
    image: "https://via.placeholder.com/300x200?text=Microlearning",
    source: "Learning Quarterly",
    date: "2023-06-02",
  },
  {
    id: "3",
    title: "Virtual Reality Applications in K-12 Classrooms",
    image: "https://via.placeholder.com/300x200?text=VR+Classroom",
    source: "Future Schools",
    date: "2023-04-28",
  },
]

interface RelatedArticlesProps {
  currentArticleUrl: string
}

export default function RelatedArticles({ currentArticleUrl }: RelatedArticlesProps) {
  const [articles, setArticles] = useState(mockRelatedArticles)

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
      return new Date(dateString).toLocaleDateString("en-US", options)
    } catch (e) {
      return dateString
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Related Articles</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <Feather name="chevron-right" size={16} color="#B40000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.articlesList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.articleCard}>
            <Image source={{ uri: item.image }} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.articleMeta}>
                <Text style={styles.articleSource}>{item.source}</Text>
                <Text style={styles.articleDate}>{formatDate(item.date)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 8,
    borderTopColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B40000",
    marginRight: 4,
  },
  articlesList: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 20,
  },
  articleCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  articleImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  articleContent: {
    padding: 12,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  articleSource: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  articleDate: {
    fontSize: 12,
    color: "#999",
  },
})
