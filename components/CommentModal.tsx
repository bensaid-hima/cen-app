import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'

const mockComments = [
  { id: '1', name: 'Sarah', comment: 'Amazing read 👏' },
  { id: '2', name: 'John', comment: 'Thanks for sharing this!' },
  { id: '3', name: 'Emma', comment: 'Wow, education is evolving fast' },
]

const emojis = ['❤️', '😂', '😮', '👏', '🥲']

export default function CommentModal({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  const [comment, setComment] = useState('')
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['50%', '90%'], [])

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [visible])

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  )

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
          <Text style={styles.title}>Comments</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockComments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.commentsList}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
        />

        <View style={styles.emojiBar}>
          {emojis.map((emoji) => (
            <TouchableOpacity key={emoji} onPress={() => setComment((prev) => prev + emoji)}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={80}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setComment('')}>
            <Ionicons name="send" size={22} color="#B40000" />
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
    backgroundColor: '#fff',
  },
  handle: {
    backgroundColor: '#ccc',
    width: 60,
    height: 5,
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 10,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  commentsList: {
    padding: 16,
    paddingBottom: 8,
  },
  comment: {
    marginBottom: 16,
  },
  name: {
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  emojiBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  emoji: {
    fontSize: 22,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})
