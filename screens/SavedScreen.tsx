import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, RefreshControl, StatusBar, Animated, TouchableOpacity } from "react-native"
import { getSavedArticles } from "../storage/savedArticles"
import CategoryArticleCard from "../components/CategoryArticleCard"
import ManualSkeletonArticleCard from "../components/ManualSkeletonArticleCard"
import { Feather } from "@expo/vector-icons"

export default function SavedScreen() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const scrollY = new Animated.Value(0)

  // Header animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  const fetchSaved = async () => {
    setLoading(true)
    const data = await getSavedArticles()
    setArticles(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSaved()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchSaved()
    setRefreshing(false)
  }

  // Group articles by date (today, this week, earlier)
  const groupedArticles = articles.reduce(
    (groups, article) => {
      const savedDate = new Date(article.savedAt || Date.now())
      const today = new Date()
      const isToday = savedDate.toDateString() === today.toDateString()

      const weekAgo = new Date()
      weekAgo.setDate(today.getDate() - 7)
      const isThisWeek = savedDate > weekAgo && !isToday

      if (isToday) {
        groups.today.push(article)
      } else if (isThisWeek) {
        groups.thisWeek.push(article)
      } else {
        groups.earlier.push(article)
      }

      return groups
    },
    { today: [], thisWeek: [], earlier: [] },
  )

  // Filter articles based on selected filter
  const getFilteredArticles = () => {
    if (filterType === "all") return articles

    // This is a placeholder - in a real app, you'd have source or category data
    // to filter by. For now, we'll just return a subset based on index.
    return articles.filter((_, index) => index % 2 === 0)
  }

  const filteredArticles = getFilteredArticles()

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyImageContainer}>
        <Feather name="bookmark" size={80} color="#e0e0e0" />
      </View>
      <Text style={styles.emptyTitle}>No saved articles yet</Text>
      <Text style={styles.emptyText}>
        Articles you save will appear here for easy access, even when you're offline.
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => {
          /* Navigate to discover */
        }}
      >
        <Text style={styles.emptyButtonText}>Discover Articles</Text>
      </TouchableOpacity>
    </View>
  )

  const renderSectionHeader = (title: string, count: number) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>Saved Articles</Text>
      </Animated.View>

      <Animated.FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <CategoryArticleCard article={item} />}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerLargeTitle}>Saved Articles</Text>
            </View>

            {/* Filter Tabs */}
            {articles.length > 0 && (
              <View style={styles.filterContainer}>
                <TouchableOpacity
                  style={[styles.filterTab, filterType === "all" && styles.filterTabActive]}
                  onPress={() => setFilterType("all")}
                >
                  <Text style={[styles.filterText, filterType === "all" && styles.filterTextActive]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterTab, filterType === "sources" && styles.filterTabActive]}
                  onPress={() => setFilterType("sources")}
                >
                  <Text style={[styles.filterText, filterType === "sources" && styles.filterTextActive]}>
                    By Source
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterTab, filterType === "topics" && styles.filterTabActive]}
                  onPress={() => setFilterType("topics")}
                >
                  <Text style={[styles.filterText, filterType === "topics" && styles.filterTextActive]}>By Topic</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Stats Summary */}
            {articles.length > 0 && (
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{articles.length}</Text>
                  <Text style={styles.statLabel}>Articles</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{groupedArticles.today.length}</Text>
                  <Text style={styles.statLabel}>Today</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {Math.round(articles.reduce((sum, article) => sum + (article.content?.length || 0) / 1000, 0))}
                  </Text>
                  <Text style={styles.statLabel}>Min Read</Text>
                </View>
              </View>
            )}

            {/* Section Headers */}
            {articles.length > 0 &&
              groupedArticles.today.length > 0 &&
              renderSectionHeader("Today", groupedArticles.today.length)}
          </>
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ManualSkeletonArticleCard />
              <ManualSkeletonArticleCard />
            </View>
          ) : (
            renderEmptyState()
          )
        }
        contentContainerStyle={[styles.list, articles.length === 0 && styles.emptyList]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#B40000" />}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    padding: 16,
  },
  header: {
    paddingHorizontal: 4,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLargeTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    letterSpacing: -0.5,
  },
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "#fff",
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
  },
  filterTextActive: {
    color: "#B40000",
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  badgeContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
  },
  emptyImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  emptyButton: {
    backgroundColor: "#B40000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
