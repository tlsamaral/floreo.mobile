import { ImageBackground, View } from 'react-native'
import '../styles/global.css'

import { Slot } from 'expo-router'
import Contants from 'expo-constants'

const statusBarHeight = Contants.statusBarHeight

export default function RootLayout() {
  return (
    <ImageBackground
      source={require('../assets/auth-root.png')}
      style={{ flex: 1 }}
    >
      <View className="flex-1 px-8" style={{ paddingTop: statusBarHeight }}>
        <Slot />
      </View>
    </ImageBackground>
  )
}
