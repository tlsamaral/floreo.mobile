import { Header } from '@/components/header'
import { Slot, usePathname } from 'expo-router'
import { View } from 'react-native'

export default function AppLayout() {
  const pathname = usePathname()

  const isProfileRoute = pathname.startsWith('/profile')

  const isNewEnginesRoute = pathname.startsWith('/engines/new-engine')

  const canViewHeader = !isProfileRoute && !isNewEnginesRoute

  return (
    <View className="flex-1 bg-second-50">
      {canViewHeader && <Header />}
      <Slot />
    </View>
  )
}
