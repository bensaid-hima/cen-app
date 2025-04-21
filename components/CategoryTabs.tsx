import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export default function CategoryTabs({ categories, selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => onSelect(category)}
            style={[
              styles.tabButton,
              selected === category && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selected === category && styles.tabTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 16,
  },
  tabButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: '#B40000',
  },
  tabText: {
    color: '#444',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
})
