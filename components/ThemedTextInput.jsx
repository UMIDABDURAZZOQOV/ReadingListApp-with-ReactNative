import { TextInput, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

export default function ThemedTextInput({ style, ...props }) {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <TextInput
      style={[{
        backgroundColor: theme.uiBackground,
        color: theme.text,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: theme.border,
        fontSize: 15,
      }, style]}
      placeholderTextColor={theme.iconColor}
      {...props}
    />
  )
}
