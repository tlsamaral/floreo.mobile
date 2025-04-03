import { ImageBackground, View } from 'react-native'
import { Asset } from 'expo-asset'
import { Button } from '../components/button'
import { useRouter } from 'expo-router'

const backgroundImage = Asset.fromModule(require('../assets/auth-root.png')).uri

export default function Index() {
  const router = useRouter()
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 flex-col justify-end items-end pb-[150px] px-6">
        <View className="flex-col gap-4 w-full">
          <Button
            text="Vamos começar"
            className="rounded-full"
            variant="secondary"
            onPress={() => router.push('/auth/sign-in')}
          />
          <Button
            text="Acessar minha conta"
            className="rounded-full"
            onPress={() => router.push('/auth/sign-in')}
          />
        </View>
      </View>
    </ImageBackground>
  )
}
