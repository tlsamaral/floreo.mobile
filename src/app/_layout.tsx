import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { Stack } from 'expo-router'

import '../styles/global.css'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
