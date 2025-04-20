// app/(tabs)/profile/_layout.tsx
import ProfileHeader from '@/components/profile/header'
import { Stack } from 'expo-router'

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="change-profile"
        options={{
          header: () => <ProfileHeader title="Atualizar perfil" />,
        }}
      />
      <Stack.Screen
        name="change-address"
        options={{
          header: () => <ProfileHeader title="Meu endereço" />,
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          header: () => <ProfileHeader title="Alterar minha senha" />,
        }}
      />
      <Stack.Screen
        name="change-password-failure"
        options={{
          header: () => <ProfileHeader title="Alterar minha senha" />,
        }}
      />
    </Stack>
  )
}
