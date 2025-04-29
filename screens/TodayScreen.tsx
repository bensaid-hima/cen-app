"use client"

import { useEffect, useState, useRef } from "react"
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Animated,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native"
import HighlightCard from "../components/HighlightCard"
import CategoryTabs from "../components/CategoryTabs"
import CategoryArticleList from "../components/CategoryArticleList"
import ManualSkeletonArticleCard from "../components/ManualSkeletonArticleCard"
import TodayHeader from "../components/TodayHeader"
import ManualSkeletonHighlightCardList from "../components/ManualSkeletonHighlightCard"

const API_KEY = "ef41003e19bcd2c694f1b11831f1df4c"
const categories = ["For You", "Trending", "Higher Ed", "K-12"]

export default function TodayScreen() {
  const [highlights, setHighlights] = useState<any[]>([])
  const [categoryArticles, setCategoryArticles] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("For You")
  const [loadingHighlights, setLoadingHighlights] = useState(true)
  const [loadingCategory, setLoadingCategory] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeDot, setActiveDot] = useState(0)
  const highlightListRef = useRef<FlatList>(null)

  // For header animation
  const scrollY = useRef(new Animated.Value(0)).current
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  useEffect(() => {
    fetchHighlights()
  }, [])

  useEffect(() => {
    fetchCategoryArticles()
  }, [selectedCategory])

  const fetchHighlights = async () => {
    setLoadingHighlights(true)
    try {
      // Using a different query for highlights to avoid duplicates
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=breaking+education+news&lang=en&country=us&max=10&apikey=${API_KEY}`,
      )
      const data = await res.json()

      // Filter out articles without images for better visual presentation
      const articlesWithImages = (data.articles || []).filter((article: any) => article.image)

      // Sort articles from newest to oldest
      const sortedArticles = articlesWithImages.sort((a: any, b: any) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })

      setHighlights(sortedArticles.slice(0, 5)) // Limit to 5 articles for highlights
    } catch (e) {
      console.error("Failed to fetch highlights:", e)
    } finally {
      setLoadingHighlights(false)
    }
  }

  const fetchCategoryArticles = async () => {
    setLoadingCategory(true)
    let query = "education"
    if (selectedCategory === "Higher Ed") query = "college OR university"
    else if (selectedCategory === "K-12") query = "k12 OR primary school"
    else if (selectedCategory === "Trending") query = "trending education"

    try {
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=6&apikey=${API_KEY}`,
      )
      const data = await res.json()
      setCategoryArticles(data.articles || [])
    } catch (e) {
      console.error("Failed to fetch category:", e)
    } finally {
      setLoadingCategory(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await Promise.all([fetchHighlights(), fetchCategoryArticles()])
    setRefreshing(false)
  }

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveDot(viewableItems[0].index)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  const scrollToHighlight = (index: number) => {
    highlightListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B40000" translucent />

      {/* Animated compact header for scrolling */}
      <Animated.View style={[styles.compactHeader, { opacity: headerOpacity }]}>
        <TodayHeader compact={true} />
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#B40000"]} tintColor="#B40000" />
        }
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Full Header */}
        <TodayHeader compact={false} />

        {/* Highlights Section */}
        <View style={styles.highlightsSection}>
          <View style={styles.breakingNewsHeader}>
            <View style={styles.breakingNewsLabelContainer}>
              <View style={styles.pulsingDot} />
              <Text style={styles.breakingNewsLabel}>BREAKING NEWS</Text>
            </View>
          </View>

          {loadingHighlights ? (
            <ManualSkeletonHighlightCardList />
          ) : (
            <>
              <FlatList
                ref={highlightListRef}
                data={highlights}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => (
                  <HighlightCard tag={item.source.name} title={item.title} imageUrl={item.image} article={item} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carousel}
                decelerationRate="fast"
                snapToInterval={320}
                snapToAlignment="center"
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                pagingEnabled={false}
              />

              {/* Pagination dots */}
              {highlights.length > 0 && (
                <View style={styles.paginationContainer}>
                  {highlights.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.paginationDot, activeDot === index && styles.paginationDotActive]}
                      onPress={() => scrollToHighlight(index)}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        </View>

        {/* Category Section */}
        <View style={styles.categorySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
          </View>

          {/* Category Tabs */}
          <CategoryTabs categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />

          {/* Category Articles */}
          <View style={styles.articlesContainer}>
            {loadingCategory ? (
              <View style={styles.loadingContainer}>
                <ManualSkeletonArticleCard />
                <ManualSkeletonArticleCard />
                <ManualSkeletonArticleCard />
              </View>
            ) : (
              <CategoryArticleList articles={categoryArticles} loading={false} />
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  compactHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  scroll: {
    paddingBottom: 80,
  },
  highlightsSection: {
    marginTop: 5,
    paddingBottom: 25,
    backgroundColor: "#f8f9fa",
  },
  breakingNewsHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  breakingNewsLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B40000",
    marginRight: 8,
  },
  breakingNewsLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#B40000",
    letterSpacing: 0.5,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    letterSpacing: -0.3,
  },
  carousel: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#B40000",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categorySection: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 25,
    paddingBottom: 30,
    marginTop: -10, // Overlap to remove any gap
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  articlesContainer: {
    marginTop: 15,
  },
  loadingContainer: {
    paddingHorizontal: 20,
  },
})
