import { StyleSheet, Text, Keyboard, TouchableWithoutFeedback, Alert, View, useColorScheme, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { createBook } from '../lib/appwrite'
import { Colors } from '../constants/Colors'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTextInput from '../components/ThemedTextInput'
import Spacer from '../components/Spacer'

export default function Create() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const handleSubmit = async () => {
    if (!title.trim()) return Alert.alert('Missing Info', 'Please enter a book title.')
    if (!author.trim()) return Alert.alert('Missing Info', 'Please enter an author name.')

    try {
      setLoading(true)
      await createBook(title.trim(), author.trim())
      router.back()
    } catch (err) {
      Alert.alert('Error', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer height={10} />

        <View style={[styles.iconBox, { backgroundColor: Colors.primary + '15' }]}>
          <Ionicons name="book" size={36} color={Colors.primary} />
        </View>

        <Spacer height={16} />
        <ThemedText title={true} style={styles.heading}>Add New Book</ThemedText>
        <ThemedText style={styles.sub}>Fill in the details below</ThemedText>
        <Spacer height={30} />

 
        <View style={styles.inputWrap}>
          <ThemedText style={styles.label}>Book Title</ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="e.g. The Great Gatsby"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />
        </View>

        <Spacer height={16} />

        <View style={styles.inputWrap}>
          <ThemedText style={styles.label}>Author</ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="e.g. F. Scott Fitzgerald"
            value={author}
            onChangeText={setAuthor}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>

        <Spacer height={32} />

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: loading ? Colors.primary + '80' : Colors.primary }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Ionicons name={loading ? 'hourglass-outline' : 'add-circle-outline'} size={20} color="#fff" />
          <Text style={styles.btnText}>{loading ? 'Adding...' : 'Add to Library'}</Text>
        </TouchableOpacity>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconBox: {
    width: 80, height: 80, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
  },
  heading: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  sub: { fontSize: 14, opacity: 0.45, marginTop: 6 },
  inputWrap: { width: '100%' },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8, opacity: 0.7 },
  input: { width: '100%' },
  btn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 6,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
})
