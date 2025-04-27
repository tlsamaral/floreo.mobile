import { Text } from '@/components/ui/Text'
import { View } from 'react-native'

export default function NewEngineScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-second-50">
      <Text className="text-2xl text-brand-800 font-medium">
        Adicionar novo Floreo
      </Text>
      <Text className="text-lg text-brand-800">
        Clique aqui para conectar outro vaso inteligente.
      </Text>
      <Text className="text-lg text-brand-800">
        Clique aqui para conectar outro vaso inteligente.
      </Text>
      <Text className="text-lg text-brand-800">
        Clique aqui para conectar outro vaso inteligente.
      </Text>
    </View>
  )
}
