import { useFonts } from 'expo-font'
import 'react-native-reanimated'

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { Stack } from 'expo-router'

import '../styles/global.css'
import { AuthProvider } from '@/contexts/auth-context'
import { PlantProvider } from '@/contexts/plant-context'
import { StatusBar } from 'react-native'


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar
        backgroundColor="#F9F7F1" // Exemplo: cor clara combinando com seu app
        barStyle="dark-content" // ou 'light-content' se for fundo escuro
        translucent={false} // Se quiser sobrepor conteúdo, use true
      />
      <AuthProvider>
        <PlantProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </PlantProvider>
      </AuthProvider>
    </>
  )
}
