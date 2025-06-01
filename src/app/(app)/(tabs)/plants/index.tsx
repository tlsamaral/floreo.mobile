import { useEffect, useState } from 'react'
import { NewFloreoButton } from '@/components/new-floreo-button'
import { PlantCard } from '@/components/plant-card'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { Link } from 'expo-router'
import { ScrollView, View, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { supabase } from '@/lib/supabase'
import { Plant } from '../home'

export default function PlantsScreen() {
  const insets = useSafeAreaInsets()
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadPlants() {
      setLoading(true)

      const { data: userInfo, error: userError } = await supabase.auth.getUser()
      const userId = userInfo?.user?.id

      if (userError || !userId) {
        Alert.alert('Erro', 'Não foi possível obter o usuário logado.')
        return
      }

      const { data, error } = await supabase
        .from('plants')
        .select('id, friendlyName, name, species, plantingDate, imageUri')
        .eq('user_id', userId)

      if (error) {
        Alert.alert('Erro ao buscar plantas', error.message)
      } else {
        setPlants(data.map((item) => ({
          id: item.id,
          friendlyName: item.friendlyName ?? '',
          imageUri: item.imageUri ?? '',
          name: item.name ?? '',
          species: item.species ?? '',
          plantingDate: item.plantingDate ?? '',
        })))
      }

      setLoading(false)
    }

    loadPlants()
  }, [])

  return (
    <ScrollView
      className="flex-1 bg-second-50 px-8 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="gap-4">
        <Text className="text-xl text-brand-800 font-medium">
          {plants.length > 0 ? 'Essas são suas plantas' : 'Não começou ainda?'}
        </Text>

        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            name={plant.name}
            plantingDate={plant.plantingDate}
            friendlyName={plant.friendlyName}
            imageUri={plant.imageUri}
          />
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
