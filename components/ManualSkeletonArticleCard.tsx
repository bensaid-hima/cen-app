import { View, StyleSheet, Dimensions } from "react-native"

const width = Dimensions.get("window").width - 32

export default function ManualSkeletonArticleCard() {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {/* Tag placeholder */}
        <View style={styles.tagContainer} />

        {/* Date placeholder */}
        <View style={styles.dateContainer} />
      </View>

      <View style={styles.textContainer}>
        {/* Title placeholder */}
        <View style={styles.titleLine} />

        {/* Footer with reading time */}
        <View style={styles.footer}>
          <View style={styles.readIndicator}>
            <View style={styles.dot} />
            <View style={styles.readTime} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 7,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  imageContainer: {
    height: 200,
    backgroundColor: "#e8e8e8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tagContainer: {
    width: 80,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 30,
  },
  dateContainer: {
    width: 60,
    height: 16,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 4,
  },
  textContainer: {
    padding: 16,
  },
  titleLine: {
    height: 18,
    width: "90%",
    backgroundColor: "#e8e8e8",
    borderRadius: 4,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    marginTop: 4,
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
    backgroundColor: "#e0e0e0",
    marginRight: 6,
  },
  readTime: {
    width: 60,
    height: 12,
    backgroundColor: "#e8e8e8",
    borderRadius: 4,
  },
})
