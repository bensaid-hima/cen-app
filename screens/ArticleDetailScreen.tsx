"use client"

import { useState, useRef } from "react"
import { View, Animated, StyleSheet, StatusBar, Share } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import ArticleHeader from "../components/ArticleHeader"
import HeroImage from "../components/HeroImage"
import ArticleMeta from "../components/ArticleMeta"
import ArticleContent from "../components/ArticleContent"
import BottomStatBar from "../components/BottomStatBar"
import CommentModal from "../components/CommentModal"

export default function ArticleDetailScreen({ route, navigation }: any) {
  const article = route.params?.article
  const [showComments, setShowComments] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current

  if (!article) return null

  const author = article.author?.trim() || article.source?.name || "Unknown Author"
  const date = article.publishedAt?.split("T")[0] || "Unknown Date"
  const tag = article.source?.name || "Education"

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title} ${article.url || ""}`,
        title: article.title,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  // Calculate reading time
  const wordCount = (article.content?.split(/\s+/).length || 0) + (article.description?.split(/\s+/).length || 0)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)) // Assuming 200 words per minute

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <ArticleHeader
          title={article.source?.name || "Article"}
          onBack={() => navigation.goBack()}
          onShare={handleShare}
        />

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <HeroImage imageUrl={article.image} tag={tag} scrollY={scrollY} />
          <ArticleMeta
            title={article.title}
            author={author}
            date={date}
            readingTime={readingTime}
            source={article.source?.name}
          />
          <ArticleContent
            description={article.description}
            content={article.content}
            author={author}
            url={article.url}
          />
        </Animated.ScrollView>

        <BottomStatBar article={article} onOpenComments={() => setShowComments(true)} onShare={handleShare} />

        <CommentModal visible={showComments} onClose={() => setShowComments(false)} articleTitle={article.title} />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
})
