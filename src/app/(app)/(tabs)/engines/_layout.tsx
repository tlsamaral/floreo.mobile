// app/(tabs)/engines/_layout.tsx
import { Stack } from 'expo-router'
import { AppHeader } from '@/components/app-header'

export default function EnginesStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="new-engine"
        options={{
          headerShown: false,
          header: () => (
            <AppHeader
              title="Adicionar Floreo"
              returnTo="/engines/new-engine"
            />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,

          header: () => (
            <AppHeader title="Detalhes do Floreo" returnTo="/engines" />
          ),
        }}
      />
    </Stack>
  )
}
