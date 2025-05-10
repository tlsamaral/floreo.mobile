import { FloreoCard } from '@/components/floreo-card'
import { NewFloreoButton } from '@/components/new-floreo-button'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { Link } from 'expo-router'
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

        {engines.length > 0 ? (
          <Link href="/(app)/(tabs)/engines/new-engine">
            <NewFloreoButton
              title="Adicionar novo Floreo"
              description="Clique aqui para conectar outro vaso inteligente."
            />
          </Link>
        ) : (
          <>
            <NewFloreoButton
              title="🌱 Vamos começar"
              description="Clique abaixo para configurar seu vaso inteligente agora mesmo e dê vida às suas plantas!"
            />

            <Link href="/(app)/(tabs)/engines/new-engine" asChild>
              <Button
                className="w-full rounded-full border-brand-900"
                variant="outline"
              >
                <Text className="text-brand-900">Adicionar Floreo</Text>
              </Button>
            </Link>
          </>
        )}
      </View>
    </ScrollView>
  )
}
