import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native'
import HighlightCard from '../components/HighlightCard'
import CategoryTabs from '../components/CategoryTabs'
import CategoryArticleList from '../components/CategoryArticleList'
import ManualSkeletonArticleCard from '../components/ManualSkeletonArticleCard'
import TodayHeader from '../components/TodayHeader'
import ManualSkeletonHighlightCardList from '../components/ManualSkeletonHighlightCard'

const API_KEY = 'ef41003e19bcd2c694f1b11831f1df4c'
const categories = ['For You', 'Trending', 'Higher Ed', 'K-12']

export default function TodayScreen() {
  const [highlights, setHighlights] = useState<any[]>([])
  const [categoryArticles, setCategoryArticles] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('For You')
  const [loadingHighlights, setLoadingHighlights] = useState(true)
  const [loadingCategory, setLoadingCategory] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchHighlights()
  }, [])

  useEffect(() => {
    fetchCategoryArticles()
  }, [selectedCategory])

  const fetchHighlights = async () => {
    setLoadingHighlights(true)
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=education&lang=en&country=us&max=10&apikey=${API_KEY}`
      )
      const data = await res.json()
      setHighlights(data.articles || [])
    } catch (e) {
      console.error('Failed to fetch highlights:', e)
    } finally {
      setLoadingHighlights(false)
    }
  }

  const fetchCategoryArticles = async () => {
    setLoadingCategory(true)
    let query = 'education'
    if (selectedCategory === 'Higher Ed') query = 'college OR university'
    else if (selectedCategory === 'K-12') query = 'k12 OR primary school'
    else if (selectedCategory === 'Trending') query = 'education'

    try {
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          query
        )}&lang=en&country=us&max=6&apikey=${API_KEY}`
      )
      const data = await res.json()
      setCategoryArticles(data.articles || [])
    } catch (e) {
      console.error('Failed to fetch category:', e)
    } finally {
      setLoadingCategory(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await Promise.all([fetchHighlights(), fetchCategoryArticles()])
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <TodayHeader />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#B40000']}
            tintColor="#B40000"
          />
        }
      >
        {/* Highlights */}
        {loadingHighlights ? (
          <ManualSkeletonHighlightCardList />
        ) : (
          <FlatList
            data={highlights}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <HighlightCard
                tag={item.source.name}
                title={item.title}
                imageUrl={item.image}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          />
        )}

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Category Articles */}
        {loadingCategory ? (
          <View style={{ paddingHorizontal: 16 }}>
            <ManualSkeletonArticleCard />
            <ManualSkeletonArticleCard />
            <ManualSkeletonArticleCard />
          </View>
        ) : (
          <CategoryArticleList
            articles={categoryArticles}
            loading={false}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // 👈 removed paddingTop to fix header spacing
  },
  scroll: {
    paddingBottom: 80,
  },
  carousel: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
