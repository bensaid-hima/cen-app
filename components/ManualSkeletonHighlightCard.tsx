import { View, StyleSheet, Dimensions, ScrollView } from "react-native"

const screenWidth = Dimensions.get("window").width

export default function ManualSkeletonHighlightCardList() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <View style={styles.tagSkeleton} />
            <View style={styles.titleSkeleton} />
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
  },
  card: {
    width: screenWidth * 0.85,
    height: 220,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#e8e8e8",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)", // lighter overlay for skeleton
  },
  textContainer: {
    padding: 16,
  },
  tagSkeleton: {
    width: 80,
    height: 12,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginBottom: 8,
  },
  titleSkeleton: {
    width: "70%",
    height: 16,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
})
