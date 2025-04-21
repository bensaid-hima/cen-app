import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
  } from "react-native"
  import { useNavigation } from "@react-navigation/native"
  import { LinearGradient } from "expo-linear-gradient"
  
  type Props = {
    article: any
  }
  
  const screenWidth = Dimensions.get("window").width
  
  export default function CategoryArticleCard({ article }: Props) {
    const navigation = useNavigation<any>()
  
    return (
      <TouchableOpacity
        key={article.url}
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("ArticleDetail", { article })}
      >
        {article.image ? (
          <ImageBackground
            source={{ uri: article.image }}
            style={styles.image}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
              style={styles.gradient}
            />
            <View style={styles.imageContent}>
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>{article.source.name}</Text>
              </View>
              {article.publishedAt && (
                <Text style={styles.date}>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
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
            {article.title}
          </Text>
          <View style={styles.footer}>
            <View style={styles.readIndicator}>
              <View style={styles.dot} />
              <Text style={styles.readTime}>
                {Math.ceil((article.content?.length || 0) / 1000)} min read
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 7,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.03)",
    },
    image: {
      width: "100%",
      height: 200,
    },
    imageStyle: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    imageContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: 16,
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
    noImage: {
      width: "100%",
      height: 120,
      backgroundColor: "#f5f5f5",
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    noImageText: {
      color: "#999",
      fontSize: 14,
    },
    textContainer: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: "#111",
      lineHeight: 24,
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
  