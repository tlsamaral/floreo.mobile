import { Header } from '@/components/header'
import { Slot, usePathname } from 'expo-router'
import { View } from 'react-native'

export default function AppLayout() {
  const pathname = usePathname()
  const isProfileRoute = pathname.startsWith('/profile')

  return (
    <View className="flex-1 bg-second-50">
      {!isProfileRoute && <Header />}
      <Slot />
    </View>
  )
}
