import { useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ThemedView = ({ style, safe = false, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[{
        backgroundColor: theme.background,
        ...(safe && { paddingTop: insets.top, paddingBottom: insets.bottom })
      }, style]}
      {...props}
    />
  )
}

export default ThemedView
