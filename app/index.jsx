import { StyleSheet, TouchableOpacity, Text, View, useColorScheme } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'

export default function Welcome() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const features = [
    { icon: 'bookmark-outline', text: 'Save books you want to read' },
    { icon: 'checkmark-circle-outline', text: 'Mark books as read' },
    { icon: 'trash-outline', text: 'Remove books from your list' },
  ]

  return (
    <ThemedView style={styles.container} safe={true}>

      <View style={styles.topDecor}>
        <View style={[styles.circle1, { backgroundColor: Colors.primary + '18' }]} />
        <View style={[styles.circle2, { backgroundColor: Colors.primaryLight + '12' }]} />
      </View>

      <View style={[styles.logoWrap, { backgroundColor: Colors.primary }]}>
        <Ionicons name="library" size={52} color="#fff" />
      </View>

      <Spacer height={24} />

      <ThemedText title={true} style={styles.title}>Reading List</ThemedText>
      <ThemedText style={styles.subtitle}>
        Your personal book tracker
      </ThemedText>

      <Spacer height={40} />


      <View style={[styles.featuresBox, { backgroundColor: theme.uiBackground, borderColor: theme.border }]}>
        {features.map((f, i) => (
          <View key={i} style={[styles.featureRow, i < features.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border }]}>
            <View style={[styles.iconBox, { backgroundColor: Colors.primary + '15' }]}>
              <Ionicons name={f.icon} size={20} color={Colors.primary} />
            </View>
            <ThemedText style={styles.featureText}>{f.text}</ThemedText>
          </View>
        ))}
      </View>

      <Spacer height={40} />


      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/books')}>
        <Text style={styles.btnText}>Get Started</Text>
        <Ionicons name="arrow-forward-circle" size={22} color="#fff" />
      </TouchableOpacity>

      <Spacer height={20} />
      <ThemedText style={styles.hint}>No account needed — just start reading!</ThemedText>

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  topDecor: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 220,
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: 300, height: 300,
    borderRadius: 150,
    top: -120, left: -60,
  },
  circle2: {
    position: 'absolute',
    width: 200, height: 200,
    borderRadius: 100,
    top: -80, right: -40,
  },
  logoWrap: {
    width: 110, height: 110,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 6,
  },
  featuresBox: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  iconBox: {
    width: 38, height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 44,
    borderRadius: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  hint: {
    fontSize: 12,
    opacity: 0.4,
    textAlign: 'center',
  }
})
