import { FloreoCard } from '@/components/floreo-card'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import { Text } from '@/components/ui/Text'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FloreoDevice } from './engines'
import { PlantHighligh } from '@/components/plant-highlight'

export type Plant = {
  id: number
  friendlyName: string
  name: string
  species: string
  plantingDate: string
  imageUri: string
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  const [devices, setDevices] = useState<FloreoDevice[]>([])
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    
    async function loadDevices() {
      setLoading(true)
      
      const { data: userInfo, error: userError } = await supabase.auth.getUser()
      const userId = userInfo?.user?.id
      

      if (userError || !userId) {
        Alert.alert('Erro', 'Não foi possível obter o usuário logado.')
        return
      }

      const { data, error } = await supabase
        .from('devices')
        .select('id, name, numeration, status')
        .eq('user_id', userId)

      const { data: plantsData, error: plantsError } = await supabase
        .from('plants')
        .select('id, friendlyName, name, species, plantingDate, imageUri')
        .eq('user_id', userId)

      if (error || plantsError) {
        Alert.alert('Erro ao buscar dispositivos', error?.message)
      } else {
        setDevices(data ?? [])
        setPlants(plantsData.map((item) => ({
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

    loadDevices()
  }, [])

  return (
    <ScrollView
      className="flex-1 bg-second-50"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="flex-1 items-center gap-4 py-7 px-7">
        <Card className="w-full bg-brand-600 border-brand-900">
          <CardContent className="p-0 flex-row gap-10">
            <View className="p-4 w-[60%] justify-between">
              <View>
                <Text className="text-lg font-medium text-second-300">
                  Como vai?
                </Text>

                <Text className="text-base text-second-300">
                  Acesse as métricas para acompanhar o progresso de suas
                  plantas.
                </Text>
              </View>

              <Button
                variant="outline"
                className="rounded-full border-white"
                size="sm"
              >
                <Text className="text-sm font-medium text-second-300">
                  Ver mais
                </Text>
              </Button>
            </View>
            <Image
              className="flex-1 w-[130px] h-[170px]"
              source={require('../../../../assets/images/floreo-item.png')}
              style={{ width: 130 }}
              // className="size-[60px] rounded-full border-second-600 border-2"
            />
          </CardContent>
        </Card>

        <Text className="text-lg font-medium text-brand-800 text-left w-full">
          Veja os seus Flóreos
        </Text>

        <FlatList
          data={devices}
          renderItem={({ item: device }) => ( 
            <FloreoCard id={device.id} numeration={device.numeration ?? ''} status={device.status ?? false} />
          )}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ gap: 12 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text className="text-lg font-medium text-brand-800 text-left w-full">
          Olhe só como estão suas plantas
        </Text>

        {plants.map((plant) => (
          <PlantHighligh
            key={plant.id}
            id={plant.id}
            name={plant.name}
            imageUri={plant.imageUri}
            friendlyName={plant.friendlyName}
            plantingDate={plant.plantingDate}
            humidityStatus="A umidade está no padrão."
            luminosityStatus="A luminosidade está em 30% (muito abaixo ⚠)"
          />
        ))}

      </View>
    </ScrollView>
  )
}
