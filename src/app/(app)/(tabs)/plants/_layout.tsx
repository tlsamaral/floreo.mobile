// app/(tabs)/engines/_layout.tsx
import { Stack } from 'expo-router'
import { AppHeader } from '@/components/app-header'

export default function EnginesStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <AppHeader title="Adicionar Floreo" returnTo="/plants" />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          header: () => <AppHeader title="Minha planta" returnTo="/plants" />,
        }}
      />
    </Stack>
  )
}
