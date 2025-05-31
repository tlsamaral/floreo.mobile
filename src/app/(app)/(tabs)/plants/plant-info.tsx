import { View, ScrollView, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { usePlantContext } from '@/contexts/plant-context'
import { ArrowLeft } from 'lucide-react-native'

export default function PlantSummaryScreen() {
  
  const { plantData, floreoId, savePlant } = usePlantContext()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  async function handleSavePlant() {
    await savePlant()
    // router.replace('/(app)/(tabs)/plants/')
  }

  if (!plantData) {
    return (
      <View className="flex-1 items-center justify-center px-6 bg-second-50">
        <Text className="text-center text-brand-900 text-lg">Nenhuma planta foi cadastrada.</Text>
        <Button onPress={() => router.replace('/(app)/(tabs)/plants/new-plant')} className="mt-6">
          <Text>Voltar ao cadastro</Text>
        </Button>
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-second-50 px-6 pt-10"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <Pressable className="flex-row items-center gap-2 mb-6">
        <ArrowLeft size={24} color="#1F3A1C" onPress={() => router.back()} />
        <Text className="text-lg font-semibold text-brand-900">Resumo do Cadastro</Text>
      </Pressable>

      {plantData.imageUri && (
        <View className="items-center my-4">
          <Image
            source={{ uri: plantData.imageUri }}
            className="size-[120px] rounded-full border-4 border-second-600"
          />
        </View>
      )}
            

      <View className="gap-4">
        <Item label="Nome original" value={plantData.name} />
        <Item label="Nome amigável" value={plantData.friendlyName} />
        <Item label="Data do plantio" value={plantData.date} />
        <Item label="Temperatura mínima (°C)" value={String(plantData.minTemperatureCelsius)} />
        <Item label="Temperatura máxima (°C)" value={String(plantData.maxTemperatureCelsius)} />
        <Item label="Luminosidade ideal (lux)" value={String(plantData.idealLuminosityLx)} />
        <Item label="Irrigações por dia" value={String(plantData.irrigationsPerDay)} />
        <Item label="Mililitros por irrigação" value={`${plantData.mlPerIrrigation} ml`} />
        <Item label="Flóreo selecionado (ID)" value={floreoId ?? 'Não selecionado'} />
      </View>

      <Button variant="brand" className="mt-10 rounded-full" onPress={handleSavePlant}>
        <Text>Concluir</Text>
      </Button>
    </ScrollView>
  )
}

type ItemProps = {
  label: string
  value: string
}

function Item({ label, value }: ItemProps) {
  return (
    <View className="border-b border-zinc-200 pb-2">
      <Text className="text-brand-900 font-medium">{label}</Text>
      <Text className="text-zinc-700">{value}</Text>
    </View>
  )
}
