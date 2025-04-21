import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'

export default function ArticleContent({
  description,
  author,
}: {
  description: string
  author: string
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{description}</Text>

      <View style={styles.quoteBox}>
        <FontAwesome5 name="quote-left" size={20} color="#B40000" style={{ marginTop: 2 }} />
        <Text style={styles.quoteText}>
          Their ideas are not only changing how we teach, but how we think about learning itself.
        </Text>
      </View>

      <Text style={styles.paragraph}>
        Young minds around the world are now leading transformative efforts in education,
        helping institutions embrace digital-first, inclusive methods of instruction.
      </Text>

      <View style={styles.authorBox}>
        <FontAwesome name="user-circle" size={48} color="#B40000" />
        <View>
          <Text style={styles.authorName}>{author}</Text>
          <Text style={styles.authorBio}>Passionate about learning & the future of education</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#222',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  quoteBox: {
    backgroundColor: '#fff5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#B40000',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 10,
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 15,
    color: '#B40000',
    flex: 1,
  },
  authorBox: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
  },
  authorName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#111',
  },
  authorBio: {
    fontSize: 13,
    color: '#666',
  },
})
