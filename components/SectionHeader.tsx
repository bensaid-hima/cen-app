import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"

type SectionHeaderProps = {
  title: string
  onSeeAll?: () => void
}

export default function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
          <Feather name="chevron-right" size={16} color="#B40000" />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B40000",
    marginRight: 4,
  },
})
