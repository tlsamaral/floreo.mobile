import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { router, useLocalSearchParams } from 'expo-router'
import { ArrowLeft, BotMessageSquare, ChartNoAxesColumn, Info } from 'lucide-react-native'
import { Image, ScrollView, View, Alert, TouchableOpacity } from 'react-native'
import { supabase } from '@/lib/supabase'
import { ActivityIndicator } from 'react-native'
import dayjs from 'dayjs'
import usePlantFeedbacks from '@/hooks/use-plant-feedback'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PlantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const insets = useSafeAreaInsets()
  const { fetchFeedback, feedback } = usePlantFeedbacks()
  
  const [plant, setPlant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sensorData, setSensorData] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    if (!id) return

    async function loadData() {
      setLoading(true)
      // Busca os dados da planta
      const { data: plantData, error: plantError } = await supabase
        .from('plants')
        .select('*')
        .eq('id', Number(id))
        .single()

      if (plantError) {
        Alert.alert('Erro ao carregar planta', plantError.message)
        return
      }

      setPlant(plantData)

      // Busca os dados mais recentes dos sensores
      const { data: sensors, error: sensorError } = await supabase
        .from('sensor_data')
        .select('sensorType, value')
        .eq('plantId', Number(id))
        .order('recordedAt', { ascending: false })

      if (sensorError) {
        Alert.alert('Erro ao carregar sensores', sensorError.message)
        return
      }

      const latestValues: { [key: string]: number } = {}

      for (const sensor of sensors) {
        if (!(sensor.sensorType! in latestValues)) {
          latestValues[sensor.sensorType!] = sensor.value
        }
      }

      setSensorData(latestValues)

      await fetchFeedback({
        planta: plantData.name,
        horasDesdeUltimaIrrigacao: 7,
        luminosidadeAtual: latestValues.luminosity,
        temperaturaAtual: latestValues.temperature
      })

      setLoading(false)
    }

    loadData()
  }, [id])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-second-50">
        <ActivityIndicator size="large" color="#504120" />
      </View>
    )
  }

  if (!plant) return null

  return (
    <ScrollView 
      className="flex-1 gap-4 px-8 py-7 bg-second-50" 
      contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}
    >
      <View className="items-center gap-4">
        <View className='flex-row items-center justify-start gap-2 w-full'>
          <TouchableOpacity
            onPress={() => router.replace('/(app)/(tabs)/plants/')}
            className="flex-row items-center gap-2"
          >
            <ArrowLeft size={24} color="#1F3A1C" />
            <Text className="text-lg font-semibold text-brand-900">Voltar</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center gap-4">
          <Image
            source={{ uri: plant.imageUri }}
            className="size-[80px] rounded-full border-second-600 border-2"
          />

          <View className="gap-2 items-center">
            <Text className="text-2xl font-semibold text-brand-900">
              {plant.friendlyName || 'Minha Planta'}
            </Text>
            <Text className="text-base font-medium text-brand-700">
              Plantada em: {dayjs(plant.plantingDate).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>

        <Card className="w-full bg-second-200 border-brand-700">
          <CardHeader className="gap-1">
            <View className="flex-row justify-between items-center gap-2">
              <CardTitle className="text-second-900 text-xl">
                Status Atual: {feedback?.status}
              </CardTitle>
              <Info size={20} color="#504120" />
            </View>
            <View className='gap-2 flex-row items-center'>
              <Text className="text-sm font-medium text-brand-800">
                Risco:
              </Text>

              <Text className="text-sm font-medium text-brand-800">
                {feedback?.risco}
              </Text>
            </View>
          </CardHeader>
        </Card>

        <Card className="w-full bg-brand-600 border-brand-900">
          <CardHeader className="flex-row justify-between items-center gap-2">
            <CardTitle className="text-second-100 text-xl">
              Dados atuais
            </CardTitle>
            <ChartNoAxesColumn size={20} color="#E8EFC1" />
          </CardHeader>
          <CardContent>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-base font-medium text-second-300">💦 Umidade</Text>
              <Text className="text-base font-medium text-second-300">
                {sensorData['humidity'] ?? '--'}% (ideal)
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-base font-medium text-second-300">☀️ Luminosidade</Text>
              <Text className="text-base font-medium text-second-300">
                {sensorData['light'] ?? '--'} lux (bom)
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-base font-medium text-second-300">🌡️ Temperatura</Text>
              <Text className="text-base font-medium text-second-300">
                {sensorData['temperature'] ?? '--'} °C
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-base font-medium text-second-300">⏳ Próxima irrigação</Text>
              <Text className="text-base font-medium text-second-300">Hoje às 18:00</Text>
            </View>
          </CardContent>
        </Card>

        <Card className="w-full bg-brand-600 border-brand-900">
          <CardHeader className="flex-row justify-between items-center gap-2">
            <CardTitle className="text-second-100 text-xl">Feedback da IA</CardTitle>
            <BotMessageSquare size={20} color="#E8EFC1" />
          </CardHeader>
          <CardContent>
            <Text className="text-base font-medium text-second-300">
              {feedback?.resumo}
            </Text>

            <View className='mt-4 gap-2'>
              <Text className="text-xl font-medium text-second-100">
                Ação recomendada
              </Text>

              <Text className="text-base font-medium text-second-300">
                {feedback?.acaoRecomendada}
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  )
}