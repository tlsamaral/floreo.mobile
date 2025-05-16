import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { useLocalSearchParams } from 'expo-router'
import { BotMessageSquare, ChartNoAxesColumn, Info } from 'lucide-react-native'
import { Image, ScrollView, View } from 'react-native'

export default function PlantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <ScrollView className="flex-1 gap-4 px-8 py-7 bg-second-50">
      <View className="items-center gap-4">
        <View className="items-center gap-4">
          <Image
            source={require('../../../../../assets/images/profile-image.png')}
            className="size-[60px] rounded-full border-second-600 border-2"
          />

          <View className="gap-2 items-center">
            <Text className="text-2xl font-semibold text-brand-900">
              Samabaia
            </Text>
            <Text className="text-base font-medium text-brand-700">
              Plantada em: 30/03/2023
            </Text>
          </View>
        </View>

        <Card className="w-full bg-second-200 border-brand-700">
          <CardHeader className="flex-row justify-between items-center gap-2">
            <CardTitle className="text-second-900 text-xl">
              Status Atual: Excelente!
            </CardTitle>
            <Info size={20} color="#504120" />
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
              <Text className="text-base font-medium text-second-300">
                💦 Umidade
              </Text>
              <Text className="text-base font-medium text-second-300">
                70% (ideal)
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-base font-medium text-second-300">
                ☀️ Luminosidade
              </Text>
              <Text className="text-base font-medium text-second-300">
                76% (bom)
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-base font-medium text-second-300">
                ⏳ Próxima irrigação
              </Text>
              <Text className="text-base font-medium text-second-300">
                Hoje às 18:00
              </Text>
            </View>
          </CardContent>
        </Card>

        <Card className="w-full bg-brand-600 border-brand-900">
          <CardHeader className="flex-row justify-between items-center gap-2">
            <CardTitle className="text-second-100 text-xl">
              Recomendações da IA
            </CardTitle>
            <BotMessageSquare size={20} color="#E8EFC1" />
          </CardHeader>
          <CardContent>
            <Text className="text-base font-medium text-second-300">
              Sua planta está muito bem cuidada! Continue mantendo-a hidratada
              regularmente.
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  )
}
