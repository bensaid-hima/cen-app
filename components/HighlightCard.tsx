import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

type RootStackParamList = {
  ArticleDetail: { article: any }
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

type HighlightProps = {
  tag: string
  title: string
  imageUrl: string
  article?: any
}

export default function HighlightCard({ tag, title, imageUrl, article }: HighlightProps) {
  const navigation = useNavigation<NavigationProp>()

  const handlePress = () => {
    if (article) {
      navigation.navigate("ArticleDetail", { article })
    }
  }

  // Format the date if available
  const formattedDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={styles.cardContainer}>
      <View style={styles.card}>
        <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground} imageStyle={styles.image}>
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
            style={styles.overlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.contentContainer}>
            <View style={styles.topRow}>
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>{tag}</Text>
              </View>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={3}>
                {title}
              </Text>

              {formattedDate && (
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formattedDate}</Text>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 220,
    marginRight: 16,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagContainer: {
    alignSelf: "flex-start",
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
  titleContainer: {
    marginTop: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 24,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  timeContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
})
