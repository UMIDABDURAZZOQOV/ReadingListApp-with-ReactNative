import { StyleSheet, TouchableOpacity, View, Alert, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import ThemedCard from './ThemedCard'
import ThemedText from './ThemedText'

const BookCard = ({ book, onDelete, onToggleStatus }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const isRead = book.status === 'read'

  const handleDelete = () => {
    Alert.alert('Delete Book', `Remove "${book.title}" from your list?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(book.$id) }
    ])
  }

  return (
    <ThemedCard style={styles.card}>
      <View style={styles.row}>

        <TouchableOpacity
          onPress={() => onToggleStatus(book.$id, isRead ? 'unread' : 'read')}
          style={[styles.checkCircle, {
            backgroundColor: isRead ? Colors.success + '22' : 'transparent',
            borderColor: isRead ? Colors.success : theme.iconColor,
          }]}
        >
          {isRead && <Ionicons name="checkmark" size={16} color={Colors.success} />}
        </TouchableOpacity>

        <View style={styles.info}>
          <ThemedText title={true} style={[styles.title, isRead && styles.readText]}>
            {book.title}
          </ThemedText>
          <View style={styles.authorRow}>
            <Ionicons name="person-outline" size={12} color={theme.iconColor} />
            <ThemedText style={styles.author}> {book.author}</ThemedText>
          </View>
        </View>

        <View style={styles.right}>
          <View style={[styles.badge, { backgroundColor: isRead ? '#DCFCE7' : '#EEF2FF' }]}>
            <ThemedText style={[styles.badgeText, { color: isRead ? Colors.success : Colors.primary }]}>
              {isRead ? 'Read' : 'Unread'}
            </ThemedText>
          </View>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={18} color={Colors.danger} />
          </TouchableOpacity>
        </View>

      </View>
    </ThemedCard>
  )
}

export default BookCard

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginVertical: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkCircle: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 2, justifyContent: 'center', alignItems: 'center',
  },
  info: { flex: 1 },
  title: { fontWeight: '700', fontSize: 15, marginBottom: 4 },
  readText: { textDecorationLine: 'line-through', opacity: 0.4 },
  authorRow: { flexDirection: 'row', alignItems: 'center' },
  author: { fontSize: 12, opacity: 0.55 },
  right: { alignItems: 'flex-end', gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '700' },
})
