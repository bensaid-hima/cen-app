import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ArticleHeader from '../components/ArticleHeader'
import HeroImage from '../components/HeroImage'
import ArticleMeta from '../components/ArticleMeta'
import ArticleContent from '../components/ArticleContent'
import BottomStatBar from '../components/BottomStatBar'
import CommentModal from '../components/CommentModal'

export default function ArticleDetailScreen({ route }: any) {
  const article = route.params?.article

  const [showComments, setShowComments] = useState(false)

  if (!article) return null

  const author = article.author?.trim() || article.source?.name || 'Unknown Author'
  const date = article.publishedAt?.split('T')[0] || 'Unknown Date'
  const tag = article.source?.name || 'Education'

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ArticleHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeroImage imageUrl={article.image} tag={tag} />
          <ArticleMeta title={article.title} author={author} date={date} />
          <ArticleContent description={article.description} author={author} />
        </ScrollView>
        <BottomStatBar
          article={article}
          onOpenComments={() => setShowComments(true)}
        />

        <CommentModal visible={showComments} onClose={() => setShowComments(false)} />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
