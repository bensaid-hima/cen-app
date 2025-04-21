import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ArticleHeader() {
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color="#111" />
      </TouchableOpacity>
      <Text style={styles.title}>EduNews</Text>
      <Feather name="more-horizontal" size={22} color="#111" />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
})
