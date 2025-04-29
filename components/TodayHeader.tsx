import { View, Text, StyleSheet, Platform } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Feather } from "@expo/vector-icons"

type TodayHeaderProps = {
  compact?: boolean
}

export default function TodayHeader({ compact = false }: TodayHeaderProps) {
  if (compact) {
    return (
      <View style={styles.compactHeader}>
        <View style={styles.compactLogoContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,0.25)", "rgba(255,255,255,0.15)"]}
            style={styles.compactLogoIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Feather name="book-open" size={18} color="#fff" />
          </LinearGradient>
          <Text style={styles.compactTitle}>Center for Education News</Text>
        </View>
      </View>
    )
  }

  return (
    <LinearGradient colors={["#B40000", "#8A0000"]} style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
            style={styles.logoIconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.logoIcon}>
              <Feather name="book-open" size={24} color="#fff" />
            </View>
          </LinearGradient>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Center for</Text>
            <Text style={styles.titleBold}>Education News</Text>
          </View>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 55 : 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoIcon: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  titleContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  titleBold: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  dateContainer: {
    marginTop: 12,
  },
  date: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },

  // Compact header styles
  compactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B40000",
  },
  compactLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  compactLogoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 8,
  },
})
