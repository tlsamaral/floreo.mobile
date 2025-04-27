import { FloreoCard } from '@/components/floreo-card'
import { NewFloreoButton } from '@/components/new-floreo-button'
import { Text } from '@/components/ui/Text'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function EngineScreen() {
  const insets = useSafeAreaInsets()
  const engines = Array.from({ length: 4 })

  return (
    <ScrollView
      className="flex-1 bg-second-50 px-8 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="gap-4">
        <Text className="text-xl text-brand-800 font-medium">
          {engines.length > 0 ? 'Esses são seus Floreos' : 'Não começou ainda?'}
        </Text>
        {engines.map((_, index) => (
          <FloreoCard key={index} />
        ))}
        <NewFloreoButton
          title="Adicionar novo Floreo"
          description="Clique aqui para conectar outro vaso inteligente."
        />
      </View>
    </ScrollView>
  )
}
