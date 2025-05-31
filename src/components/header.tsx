import { Image, Pressable, View } from 'react-native'
import Contants from 'expo-constants'
import { Text } from './ui/Text'
import { Bell } from 'lucide-react-native'
import { useAuth } from '@/contexts/auth-context'
import { getInitials } from '@/lib/utils'

const statusBarHeight = Contants.statusBarHeight

export function getGreetingWithEmoji(): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return 'Bom dia ☀️'
  }
  if (hour >= 12 && hour < 18) {
    return 'Boa tarde 🌤️'
  }

  return 'Boa noite 🌑'
}

export function Header() {
  const { user } = useAuth()
  const name = user?.user_metadata?.name || 'Usuário'
  const avatarUrl = user?.user_metadata?.avatar_url || null
  const initials = getInitials(name)

  return (
    <View className="px-8 bg-second-50" style={{ paddingTop: statusBarHeight }}>
      <View className="pb-3 border-b border-b-second-600 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="w-12 h-12 rounded-full border-2 border-second-600 overflow-hidden items-center justify-center bg-white">
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-brand-700 text-lg font-bold">
                {initials}
              </Text>
            )}
          </View>

          <View>
            <Text className="font-medium text-2xl text-brand-900 m-0">
              {getGreetingWithEmoji()}
            </Text>
            <Text className="text-base text-brand-900 leading-none">
              {name}
            </Text>
          </View>
        </View>

        <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-tertiary-100">
          <Bell size={20} color={'#3C683A'} />
        </Pressable>
      </View>
    </View>
  )
}
