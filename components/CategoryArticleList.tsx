import { ActivityIndicator, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"

type RootStackParamList = {
  ArticleDetail: { article: any }
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

type Props = {
  articles: any[]
  loading: boolean
}

const screenWidth = Dimensions.get("window").width

export default function CategoryArticleList({ articles, loading }: Props) {
  const navigation = useNavigation<NavigationProp>()

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#B40000" />
        <Text style={styles.loadingText}>Loading articles...</Text>
      </View>
    )
  }

  if (articles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No articles found</Text>
      </View>
    )
  }

  return (
    <View style={styles.list}>
      {articles.map((item) => (
        <TouchableOpacity
          key={item.url}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("ArticleDetail", { article: item })}
        >
          {item.image ? (
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.image}
              imageStyle={styles.imageStyle}
              resizeMode="cover"
            >
              <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]} style={styles.gradient} />
              <View style={styles.imageContent}>
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>{item.source.name}</Text>
                </View>
                {item.publishedAt && (
                  <Text style={styles.date}>
                    {new Date(item.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                )}
              </View>
            </ImageBackground>
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>No Image</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.footer}>
              <View style={styles.readIndicator}>
                <View style={styles.dot} />
                <Text style={styles.readTime}>{Math.ceil((item.content?.length || 0) / 1000)} min read</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
  },
  imageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
  },
  noImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  noImageText: {
    color: "#999",
    fontSize: 14,
  },
  tagContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tag: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111",
  },
  date: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    lineHeight: 22,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  readIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#B40000",
    marginRight: 6,
  },
  readTime: {
    fontSize: 12,
    color: "#777",
    fontWeight: "500",
  },
})
