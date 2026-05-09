import { StyleSheet, FlatList, ActivityIndicator, View, TouchableOpacity, Text, useColorScheme } from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { getBooks, deleteBook, updateBookStatus } from '../lib/appwrite'
import { Colors } from '../constants/Colors'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import BookCard from '../components/BookCard'
import Spacer from '../components/Spacer'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
]

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const data = await getBooks()
      setBooks(data)
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => { fetchBooks() }, []))

  const handleDelete = async (id) => {
    try {
      await deleteBook(id)
      setBooks(prev => prev.filter(b => b.$id !== id))
    } catch (err) { console.log(err.message) }
  }

  const handleToggle = async (id, newStatus) => {
    try {
      await updateBookStatus(id, newStatus)
      setBooks(prev => prev.map(b => b.$id === id ? { ...b, status: newStatus } : b))
    } catch (err) { console.log(err.message) }
  }

  const filtered = books.filter(b => filter === 'all' || b.status === filter)
  const readCount = books.filter(b => b.status === 'read').length
  const unreadCount = books.filter(b => b.status === 'unread').length

  return (
    <ThemedView style={styles.container} safe={true}>

      <View style={styles.header}>
        <View>
          <ThemedText title={true} style={styles.heading}>My Library</ThemedText>
          <ThemedText style={styles.stats}>
            {readCount} read · {unreadCount} to read
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: Colors.primary }]}
          onPress={() => router.push('/create')}
        >
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {books.length > 0 && (
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: Colors.primary + '15' }]}>
            <ThemedText style={[styles.statNum, { color: Colors.primary }]}>{books.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors.success + '15' }]}>
            <ThemedText style={[styles.statNum, { color: Colors.success }]}>{readCount}</ThemedText>
            <ThemedText style={styles.statLabel}>Read</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F59E0B15' }]}>
            <ThemedText style={[styles.statNum, { color: '#F59E0B' }]}>{unreadCount}</ThemedText>
            <ThemedText style={styles.statLabel}>Unread</ThemedText>
          </View>
        </View>
      )}

      <View style={[styles.filterRow, { borderBottomColor: theme.border }]}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={[styles.filterTab, filter === f.key && { borderBottomColor: Colors.primary, borderBottomWidth: 2.5 }]}
          >
            <ThemedText style={[styles.filterText, filter === f.key && { color: Colors.primary, fontWeight: '700' }]}>
              {f.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Spacer height={12} />
          <ThemedText style={{ opacity: 0.4 }}>Loading your books...</ThemedText>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.center}>
          <View style={[styles.emptyIcon, { backgroundColor: Colors.primary + '12' }]}>
            <Ionicons name="book-outline" size={48} color={Colors.primary} />
          </View>
          <Spacer height={16} />
          <ThemedText title={true} style={styles.emptyTitle}>
            {filter === 'all' ? 'No books yet' : `No ${filter} books`}
          </ThemedText>
          <ThemedText style={styles.emptyText}>
            {filter === 'all' ? 'Tap + to add your first book' : 'Try a different filter'}
          </ThemedText>
          {filter === 'all' && (
            <TouchableOpacity
              style={[styles.emptyBtn, { backgroundColor: Colors.primary }]}
              onPress={() => router.push('/create')}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '700', marginLeft: 6 }}>Add Book</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.$id}
          renderItem={({ item }) => (
            <BookCard book={item} onDelete={handleDelete} onToggleStatus={handleToggle} />
          )}
          contentContainerStyle={{ paddingVertical: 10, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  heading: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  stats: { fontSize: 13, opacity: 0.45, marginTop: 3 },
  addBtn: {
    width: 46, height: 46, borderRadius: 23,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  statCard: {
    flex: 1, borderRadius: 12,
    paddingVertical: 10, alignItems: 'center',
  },
  statNum: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 11, opacity: 0.55, marginTop: 2 },
  filterRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  filterTab: {
    flex: 1, paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  filterText: { fontSize: 13, fontWeight: '500' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyIcon: {
    width: 90, height: 90, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  emptyText: { fontSize: 14, opacity: 0.45, textAlign: 'center' },
  emptyBtn: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 20, paddingVertical: 12,
    paddingHorizontal: 24, borderRadius: 12,
  },
})
