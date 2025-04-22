import { View, Text, StyleSheet, Image, Platform } from "react-native"
import { FontAwesome5, Feather } from "@expo/vector-icons"

interface ArticleContentProps {
  description: string
  content: string
  author: string
}

export default function ArticleContent({ description, content, author }: ArticleContentProps) {
  const generateParagraphs = () => {
    if (!content) return [description]
    const clean = content.replace(/\[.*?\]/g, "")
    return clean.split("\n").filter((p) => p.trim().length > 0)
  }

  const paragraphs = generateParagraphs()
  const firstLetter = paragraphs[0]?.charAt(0) || ""
  const restOfFirstParagraph = paragraphs[0]?.substring(1) || ""

  return (
    <View style={styles.container}>
      {/* Drop Cap Paragraph */}
      <View style={styles.dropCapRow}>
        <Text style={styles.dropCap}>{firstLetter}</Text>
        <Text style={styles.firstParagraph}>{restOfFirstParagraph}</Text>
      </View>

      {/* Featured Image */}
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: "https://via.placeholder.com/800x400?text=Education+Innovation" }}
          style={styles.image}
        />
        <Text style={styles.caption}>Education innovation is transforming classrooms worldwide</Text>
      </View>

      {/* Remaining Paragraphs */}
      {paragraphs.slice(1).map((para, index) => (
        <Text key={index} style={styles.paragraph}>{para}</Text>
      ))}

      {/* Pull Quote */}
      <View style={styles.quoteBox}>
        <FontAwesome5 name="quote-left" size={18} color="#B40000" />
        <Text style={styles.quote}>
          Their ideas are not only changing how we teach, but how we think about learning itself.
        </Text>
      </View>

      <Text style={styles.paragraph}>
        Young minds around the world are now leading transformative efforts in education, helping institutions embrace digital-first, inclusive methods of instruction.
      </Text>

      {/* Key Points */}
      <View style={styles.keyPoints}>
        <Text style={styles.keyPointsTitle}>Key Takeaways</Text>
        {[
          "Education technology continues to evolve rapidly",
          "Personalized learning approaches show promising results",
          "Educators need ongoing support to implement new methods",
        ].map((point, i) => (
          <View key={i} style={styles.keyPoint}>
            <View style={styles.bullet}>
              <Feather name="check" size={14} color="#fff" />
            </View>
            <Text style={styles.keyPointText}>{point}</Text>
          </View>
        ))}
      </View>

      {/* Author */}
      <View style={styles.authorBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{author.charAt(0)}</Text>
        </View>
        <View style={styles.authorMeta}>
          <Text style={styles.authorName}>{author}</Text>
          <Text style={styles.authorRole}>Passionate about learning & the future of education</Text>
        </View>
      </View>
    </View>
  )
}

const baseFont = Platform.OS === 'ios' ? 'Georgia' : 'serif'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dropCapRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  dropCap: {
    fontSize: 44,
    fontWeight: '700',
    fontFamily: baseFont,
    color: '#B40000',
    lineHeight: 50,
    marginRight: 6,
  },
  firstParagraph: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: '#222',
    fontFamily: baseFont,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#222',
    fontFamily: baseFont,
    marginBottom: 20,
  },
  imageWrap: {
    marginVertical: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  caption: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 13,
    color: '#777',
    marginTop: 8,
  },
  quoteBox: {
    flexDirection: 'row',
    backgroundColor: '#fff5f5',
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#B40000',
    borderRadius: 10,
    marginVertical: 20,
    gap: 12,
  },
  quote: {
    fontStyle: 'italic',
    color: '#B40000',
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  keyPoints: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
    marginBottom: 24,
  },
  keyPointsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  bullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#B40000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  keyPointText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    flex: 1,
  },
  authorBox: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B40000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarInitial: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111',
    marginBottom: 4,
  },
  authorRole: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
})
