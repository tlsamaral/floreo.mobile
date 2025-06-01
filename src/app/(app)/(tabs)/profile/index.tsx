// app/(tabs)/profile/index.tsx
import { View, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import {
  ChevronRight,
  LockKeyhole,
  LogOut,
  MapPin,
  UserRoundPen,
} from 'lucide-react-native'

import Contants from 'expo-constants'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'
import { getInitials } from '@/lib/utils'
import { useEffect, useState } from 'react'

const statusBarHeight = Contants.statusBarHeight

export default function ProfileScreen() {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const { user } = useAuth()

  async function handleSignOut() {
    await supabase.auth.signOut()

    router.replace('/auth/sign-in')
  }

  useEffect(() => {
    async function fetchUserAvatar() {
      if (!user) return

      const { data, error } = await supabase
        .from('users') // Nome da sua tabela no Supabase
        .select('avatarUrl')
        .eq('id', user.id) // ou .eq('email', user.email) dependendo da sua chave
        .single()

      if (error) {
        console.error('Erro ao buscar avatar:', error)
        return
      }

      if (data?.avatarUrl) {
        setAvatarUrl(data.avatarUrl)
      }
    }

    fetchUserAvatar()
  }, [user])

  const initials = getInitials(user?.user_metadata.name)

  return (
    <View
      className="flex-1 items-center gap-14 bg-second-50 py-9 px-7"
      style={{ paddingTop: statusBarHeight + 8 }}
    >
      <Text className="text-brand-900 text-2xl font-bold">Meu Perfil</Text>

      <View className="gap-4 items-center">
        <View className="size-[180px] rounded-full overflow-hidden border-4 border-second-600 flex items-center justify-center">
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: 180, height: 180 }}
            />
          ) : (
            <Text className="text-[60px] uppercase text-second-700">
              {initials}
            </Text>
          )}
        </View>
        {/* <Image source={require('@/assets/profile-image.png')} /> */}
        <Text className="text-brand-900 text-2xl font-semibold leading-none">
          {user?.user_metadata.name}
        </Text>
        <Text className="text-brand-900 font-regular leading-none -mt-3">
          {user?.user_metadata.email}
        </Text>
      </View>

      <View className="gap-4 w-full">
        <Button
          variant="alternative"
          className="flex-row items-center justify-between"
          onPress={() => router.push('/(app)/(tabs)/profile/change-profile')}
        >
          <View className="flex-row items-center gap-2">
            <UserRoundPen color="#243E22" />
            <Text>Alterar Perfil</Text>
          </View>

          <ChevronRight color="#243E22" />
        </Button>
        <Button
          variant="alternative"
          className="flex-row items-center justify-between"
          onPress={() => router.push('/(app)/(tabs)/profile/change-address')}
        >
          <View className="flex-row items-center gap-2">
            <MapPin color="#243E22" />
            <Text>Alterar Endereço</Text>
          </View>

          <ChevronRight color="#243E22" />
        </Button>
        <Button
          variant="alternative"
          className="flex-row items-center justify-between"
          onPress={() =>
            router.push('/(app)/(tabs)/profile/change-password-failure')
          }
        >
          <View className="flex-row items-center gap-2">
            <LockKeyhole color="#243E22" />
            <Text>Alterar Senha</Text>
          </View>

          <ChevronRight color="#243E22" />
        </Button>
      </View>

      <Button
        variant="brand"
        className="flex-row items-center gap-2 rounded-full w-full bg-brand-900"
        onPress={handleSignOut}
      >
        <LogOut color="#fff" size={20} />
        <Text>Sair</Text>
      </Button>
    </View>
  )
}
