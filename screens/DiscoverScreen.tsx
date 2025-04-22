import React, { useEffect, useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Animated,
  Platform,
} from "react-native"
import CategoryArticleCard from "../components/CategoryArticleCard"
import ManualSkeletonArticleCard from "../components/ManualSkeletonArticleCard"

const API_KEY = "ef41003e19bcd2c694f1b11831f1df4c"

const topics = ["EdTech", "AI", "Higher Ed", "Exams", "Policies", "Remote Learning", "K-12"]

export default function DiscoverScreen() {
  const [search, setSearch] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("EdTech")
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const scrollY = new Animated.Value(0)
  const inputRef = useRef<TextInput>(null)

  // Header animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  useEffect(() => {
    fetchArticles()
  }, [selectedTopic])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const query = search.trim() !== "" ? search : selectedTopic
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=10&apikey=${API_KEY}`,
      )
      const data = await res.json()
      setArticles(data.articles || [])
    } catch (e) {
      console.error("Discover fetch failed:", e)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchArticles()
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>Discover</Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#B40000" />}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLargeTitle}>Discover</Text>
        </View>

        {/* Improved Search Input */}
        <View style={styles.searchWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search education topics..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={fetchArticles}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSearch("")
                inputRef.current?.focus()
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Topics */}
        <View style={styles.topicsContainer}>
          <FlatList
            data={topics}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTopic(item)
                  setSearch("")
                }}
                style={[styles.chip, selectedTopic === item && styles.chipSelected]}
              >
                <Text style={selectedTopic === item ? styles.chipTextSelected : styles.chipText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Articles Section */}
        <View style={styles.articlesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{search ? `Results for "${search}"` : `${selectedTopic} Articles`}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{articles.length}</Text>
            </View>
          </View>

          {/* Article List */}
          {loading ? (
            <>
              <ManualSkeletonArticleCard />
              <ManualSkeletonArticleCard />
              <ManualSkeletonArticleCard />
            </>
          ) : articles.length > 0 ? (
            articles.map((item) => <CategoryArticleCard key={item.url} article={item} />)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No articles found</Text>
              <Text style={styles.emptySubtext}>Try a different topic or search term</Text>
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </View>
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
  header: {
    paddingHorizontal: 20,
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
  searchWrapper: {
    marginHorizontal: 20,
    marginBottom: 20,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  clearButton: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "400",
  },
  topicsContainer: {
    marginBottom: 20,
  },
  chipRow: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  chipSelected: {
    backgroundColor: "#B40000",
    borderColor: "#B40000",
  },
  chipText: {
    fontWeight: "600",
    color: "#555",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  articlesSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#777",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubtext: {
    color: "#999",
    fontSize: 14,
    marginTop: 4,
  },
})
