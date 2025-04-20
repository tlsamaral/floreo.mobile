// app/(tabs)/profile/index.tsx
import { View, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import {
  ChevronRight,
  LockKeyhole,
  MapPin,
  UserRoundPen,
} from 'lucide-react-native'

export default function ProfileScreen() {
  const router = useRouter()

  return (
    <View className="flex-1 items-center gap-14 bg-second-50 py-9 px-7">
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
          onPress={() => router.push('/(app)/(tabs)/profile/change-password')}
        >
          <View className="flex-row items-center gap-2">
            <LockKeyhole color="#243E22" />
            <Text>Alterar Senha</Text>
          </View>

          <ChevronRight color="#243E22" />
        </Button>
      </View>
    </View>
  )
}
