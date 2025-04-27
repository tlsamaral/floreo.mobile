// app/(tabs)/profile/_layout.tsx
import { AppHeader } from '@/components/app-header'
import { Stack } from 'expo-router'

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="change-profile"
        options={{
          header: () => (
            <AppHeader
              title="Atualizar perfil"
              returnTo="/profile/change-profile"
            />
          ),
        }}
      />
      <Stack.Screen
        name="change-address"
        options={{
          header: () => (
            <AppHeader
              title="Meu endereço"
              returnTo="/profile/change-address"
            />
          ),
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          header: () => (
            <AppHeader
              title="Alterar minha senha"
              returnTo="/profile/change-password"
            />
          ),
        }}
      />
      <Stack.Screen
        name="change-password-failure"
        options={{
          header: () => (
            <AppHeader
              title="Alterar minha senha"
              returnTo="/profile/change-password-failure"
            />
          ),
        }}
      />
    </Stack>
  )
}
