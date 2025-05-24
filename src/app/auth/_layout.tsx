import Contants from 'expo-constants'
import { Asset } from 'expo-asset'
import { router, Slot } from 'expo-router'
import { ImageBackground, View } from 'react-native'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'

const statusBarHeight = Contants.statusBarHeight
const backgroundImage = Asset.fromModule(
  require('../../assets/auth-root.png'),
).uri

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(app)/(tabs)/home')
    }
  }, [isAuthenticated])

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="px-10 flex-1">
        <Slot />
      </View>
    </ImageBackground>
  )
}
