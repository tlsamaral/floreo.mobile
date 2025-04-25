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

const statusBarHeight = Contants.statusBarHeight

export default function ProfileScreen() {
  const router = useRouter()

  return (
    <View
      className="flex-1 items-center gap-14 bg-second-50 py-9 px-7"
      style={{ paddingTop: statusBarHeight + 8 }}
    >
      <Text className="text-brand-900 text-2xl font-bold">Meu Perfil</Text>

      <View className="gap-4 items-center">
        <Image source={require('@/assets/profile-image.png')} />
        <Text className="text-brand-900 text-2xl font-semibold leading-none">
          Felipe Antonio
        </Text>
        <Text className="text-brand-900 font-regular leading-none -mt-3">
          @felipeantonio
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
        onPress={() => router.push('/(app)/(tabs)/profile/change-password')}
      >
        <LogOut color="#fff" size={20} />
        <Text>Sair</Text>
      </Button>
    </View>
  )
}
