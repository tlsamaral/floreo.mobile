import { View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Text } from '../ui/Text'
import { ChevronLeft } from 'lucide-react-native'

import Contants from 'expo-constants'

const statusBarHeight = Contants.statusBarHeight

export default function ProfileHeader({ title }: { title: string }) {
  const router = useRouter()

  return (
    <View
      className="h-16 bg-gray-100 px-6 flex-row items-center justify-between"
      style={{ paddingTop: statusBarHeight + 8 }}
    >
      <TouchableOpacity
        className="size-7 rounded-full bg-brand-900 flex justify-center items-center"
        onPress={() => router.replace('/(app)/(tabs)/profile')}
      >
        <ChevronLeft size={18} color="#FDFDF9" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-brand-900 flex-1 text-center">
        {title}
      </Text>

      <View className="w-6" />
    </View>
  )
}
