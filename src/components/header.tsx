import { Image, Pressable, View } from 'react-native'
import Contants from 'expo-constants'
import { Text } from './ui/Text'
import { Bell } from 'lucide-react-native'

const statusBarHeight = Contants.statusBarHeight

export function getGreetingWithEmoji(): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return 'Bom dia ☀️'
  }
  if (hour >= 12 && hour < 18) {
    return 'Boa tarde 🌤️'
  }
  if (hour >= 18 && hour < 22) {
    return 'Boa noite 🌙'
  }
  return 'Boa madrugada 🌌'
}

export function Header() {
  return (
    <View
      className="w-11/12 mx-auto flex-row items-center justify-between px-10 pb-3 border-b border-b-second-600 bg-second-50"
      style={{ paddingTop: statusBarHeight }}
    >
      <View className="flex-row items-center gap-2">
        <Image source={require('../assets/avatar.png')} />
        <View>
          <Text className="font-medium text-2xl text-brand-900 m-0 ">
            {getGreetingWithEmoji()}
          </Text>
          <Text className="text-lg text-brand-900 leading-none">
            Felipe antonio
          </Text>
        </View>
      </View>

      <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-tertiary-100">
        <Bell size={20} color={'#3C683A'} />
      </Pressable>
    </View>
  )
}
