import { NewFloreoButton } from '@/components/new-floreo-button'
import { PlantCard } from '@/components/plant-card'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { Link } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PlantsScreen() {
  const insets = useSafeAreaInsets()
  const plants = Array.from({ length: 4 })

  return (
    <ScrollView
      className="flex-1 bg-second-50 px-8 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="gap-4">
        <Text className="text-xl text-brand-800 font-medium">
          {plants.length > 0 ? 'Essas são suas plantas' : 'Não começou ainda?'}
        </Text>
        {plants.map((_, index) => (
          <PlantCard key={index} />
        ))}

        {plants.length > 0 ? (
          <Link href="/(app)/(tabs)/plants/new-plant" asChild>
            <Button
              className="w-full rounded-full border-brand-900"
              variant="brand"
            >
              <Text className="text-brand-50">Adicionar uma nova planta</Text>
            </Button>
          </Link>
        ) : (
          <>
            <NewFloreoButton
              title="🌱 Vamos começar"
              description="Clique abaixo para configurar seu vaso inteligente agora mesmo e dê vida às suas plantas!"
            />

            <Link href="/(app)/(tabs)/engines/plant-details" asChild>
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
