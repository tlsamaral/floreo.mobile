import { Text } from '@/components/ui/Text'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function EngineScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <View className="flex-1 bg-second-50 px-8 py-4">
      <Text className="text-xl text-brand-800 font-medium">{id}</Text>
    </View>
  )
}
