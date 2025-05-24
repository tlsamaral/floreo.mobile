import { ImageBackground, View } from 'react-native'
import { Asset } from 'expo-asset'
import { Button } from '../components/ui/Button'
import { useRouter } from 'expo-router'
import { Text } from '@/components/ui/Text'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'

const backgroundImage = Asset.fromModule(require('../assets/auth-root.png')).uri

export default function Index() {
  const router = useRouter()

  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/auth/sign-in')
    } else if (!loading && isAuthenticated) {
      router.replace('/(app)/(tabs)/home')
    }
  }, [isAuthenticated, loading, router])

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 flex-col justify-end items-end pb-[150px] px-6">
        <View className="flex-col gap-4 w-full ">
          <Button
            className="rounded-full"
            variant="second"
            onPress={() => router.push('/auth/sign-up')}
          >
            <Text>Vamos começar</Text>
          </Button>
          <Button
            className="rounded-full bg-brand-700"
            variant="brand"
            onPress={() => router.push('/auth/sign-in')}
          >
            <Text>Acessar a minha conta</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}
