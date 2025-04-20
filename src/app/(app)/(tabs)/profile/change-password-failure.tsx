import { Text } from '@/components/ui/Text'
import { View } from 'react-native'

export default function ChangePasswordFailure() {
  return (
    <View className="flex-1 items-center justify-center px-7">
      <Text className="text-lg text-brand-900">Alterar senha com erro</Text>
      {/* Aqui você pode adicionar o formulário para alterar o perfil */}
    </View>
  )
}
