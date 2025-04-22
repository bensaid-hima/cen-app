"use client"

import { useCallback, useMemo, useRef, useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
  ActivityIndicator,
} from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet"

const mockComments = [
  {
    id: "1",
    name: "Sarah Johnson",
    comment: "Amazing read 👏 This really changed my perspective on education technology.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "2h ago",
    likes: 24,
    isLiked: false,
  },
  {
    id: "2",
    name: "John Smith",
    comment: "Thanks for sharing this! I've been looking for resources on this topic for my research.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "5h ago",
    likes: 8,
    isLiked: true,
  },
  {
    id: "3",
    name: "Emma Wilson",
    comment:
      "Wow, education is evolving fast. I wonder how traditional institutions will adapt to these changes in the coming years.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    time: "1d ago",
    likes: 15,
    isLiked: false,
  },
  {
    id: "4",
    name: "Michael Brown",
    comment: "I've implemented some of these techniques in my classroom and the results have been incredible!",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    time: "2d ago",
    likes: 32,
    isLiked: false,
  },
]

const emojis = ["❤️", "👍", "👏", "🔥", "💯", "🤔"]

interface CommentModalProps {
  visible: boolean
  onClose: () => void
  articleTitle: string
}

export default function CommentModal({ visible, onClose, articleTitle }: CommentModalProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(mockComments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sortBy, setSortBy] = useState("recent") // recent, popular
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const inputRef = useRef<TextInput>(null)

  const snapPoints = useMemo(() => ["60%", "90%"], [])

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [visible])

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />,
    [],
  )

  const handleSubmitComment = () => {
    if (!comment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newComment = {
        id: Date.now().toString(),
        name: "You",
        comment: comment.trim(),
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        time: "Just now",
        likes: 0,
        isLiked: false,
      }

      setComments([newComment, ...comments])
      setComment("")
      setIsSubmitting(false)
      Keyboard.dismiss()
    }, 500)
  }

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )
  }

  const sortedComments = useMemo(() => {
    if (sortBy === "popular") {
      return [...comments].sort((a, b) => b.likes - a.likes)
    }
    return comments
  }, [comments, sortBy])

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={onClose}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Comments ({comments.length})</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle} numberOfLines={1}>
            {articleTitle}
          </Text>
        </View>

        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === "recent" && styles.sortButtonActive]}
            onPress={() => setSortBy("recent")}
          >
            <Text style={[styles.sortText, sortBy === "recent" && styles.sortTextActive]}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === "popular" && styles.sortButtonActive]}
            onPress={() => setSortBy("popular")}
          >
            <Text style={[styles.sortText, sortBy === "popular" && styles.sortTextActive]}>Popular</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sortedComments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.commentsList}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.likeButton} onPress={() => handleLikeComment(item.id)}>
                    <Ionicons
                      name={item.isLiked ? "heart" : "heart-outline"}
                      size={16}
                      color={item.isLiked ? "#B40000" : "#666"}
                    />
                    <Text style={[styles.likeCount, item.isLiked && styles.likedText]}>{item.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.replyButton}>
                    <Feather name="corner-up-left" size={14} color="#666" />
                    <Text style={styles.replyText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.emojiBar}>
          {emojis.map((emoji) => (
            <TouchableOpacity key={emoji} onPress={() => setComment((prev) => prev + emoji)} style={styles.emojiButton}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={80}
          style={styles.inputContainer}
        >
          <TextInput
            ref={inputRef}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
            style={styles.input}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSubmitComment}
            disabled={!comment.trim() || isSubmitting}
            style={[styles.sendButton, (!comment.trim() || isSubmitting) && styles.sendButtonDisabled]}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send" size={18} color="#fff" />
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetBackground: {
    backgroundColor: "#fff",
  },
  handle: {
    backgroundColor: "#ccc",
    width: 60,
    height: 5,
    borderRadius: 4,
    alignSelf: "center",
    marginVertical: 10,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: "#111",
  },
  articleInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
  },
  articleTitle: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  sortContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: "#f0f0f0",
  },
  sortText: {
    fontSize: 14,
    color: "#666",
  },
  sortTextActive: {
    color: "#111",
    fontWeight: "600",
  },
  commentsList: {
    padding: 16,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontWeight: "600",
    color: "#111",
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: "row",
    marginTop: 8,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  likeCount: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  likedText: {
    color: "#B40000",
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  emojiBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  emojiButton: {
    padding: 8,
  },
  emoji: {
    fontSize: 22,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#B40000",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
})
