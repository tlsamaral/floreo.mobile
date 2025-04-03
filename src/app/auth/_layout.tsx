import Contants from 'expo-constants'
import { Asset } from 'expo-asset'
import { Slot } from 'expo-router'
import { ImageBackground, View } from 'react-native'

const statusBarHeight = Contants.statusBarHeight
const backgroundImage = Asset.fromModule(
  require('../../assets/auth-root.png'),
).uri

export default function AuthLayout() {
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="px-6">
        <Slot />
      </View>
    </ImageBackground>
  )
}
