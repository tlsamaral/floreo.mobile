import { Header } from '@/components/header'
import { useAuth } from '@/contexts/auth-context'
import { Asset } from 'expo-asset'
import { router, Slot, usePathname } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'

const backgroundImage = Asset.fromModule(
  require('../../../assets/images/background.png'),
).uri

export default function AppLayout() {
  const pathname = usePathname()

  const isProfileRoute = pathname.startsWith('/profile')

  const isNewEnginesRoute = pathname.startsWith('/engines/new-engine')

  const canViewHeader = !isProfileRoute && !isNewEnginesRoute

  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/auth/sign-in')
    }
  }, [isAuthenticated, loading])

  return (
    <View
      className="flex-1 bg-second-50"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {canViewHeader && <Header />}
      <Slot />
    </View>
  )
}
