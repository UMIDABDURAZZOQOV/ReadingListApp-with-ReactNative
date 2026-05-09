import { Stack } from "expo-router"
import { useColorScheme } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Colors } from "../constants/Colors"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="books" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{
          title: 'Add New Book',
          presentation: 'modal',
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }} />
      </Stack>
    </>
  )
}
