import Contants from 'expo-constants'
import { Asset } from 'expo-asset'
import { Slot } from 'expo-router'
import { View } from 'react-native'

const statusBarHeight = Contants.statusBarHeight
const backgroundImage = Asset.fromModule(
  require('../../assets/auth-root.png'),
).uri

export default function AuthLayout() {
  return (
    // <ImageBackground
    //   source={{ uri: backgroundImage }}
    //   style={{ flex: 1 }}
    //   resizeMode="cover"
    // >
    <View className="px-10 flex-1 bg-brand-900">
      <Slot />
    </View>
    // </ImageBackground>
  )
}
