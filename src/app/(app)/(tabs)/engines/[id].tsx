import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { Link, useLocalSearchParams } from 'expo-router'
import {
  AlertCircle,
  ChevronLeft,
  RefreshCcw,
  Sprout,
} from 'lucide-react-native'
import { View } from 'react-native'

export default function EngineScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <View className="flex-1 bg-second-50 px-8 py-4 gap-4">
      <Link
        href="/(app)/(tabs)/engines"
        className="text-brand-800 flex-row items-center justify-center gap-2"
      >
        <ChevronLeft size={20} color="#77A974" />
        <Text className="text-brand-400">Voltar para meus floreos</Text>
      </Link>
      <Card className="bg-brand-500 w-full border border-brand-900">
        <CardHeader className="flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="text-second-100">FLR-4299</CardTitle>
          <View className="flex-row items-center gap-2">
            <View className="size-2 rounded-full bg-brand-100" />
            <Text>Ativo</Text>
          </View>
        </CardHeader>
        <CardContent className="gap-2">
          <View className="flex-row items-center gap-2">
            <Sprout size={20} color="#E8EFC1" />
            <Text className="text-lg font-medium text-second-200">
              Samabaia
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <RefreshCcw size={20} color="#C1E3F6" />
            <Text className="text-lg font-medium text-second-200">
              Sincronizado há 5 min.
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <AlertCircle size={20} color="#FFCF50" />
            <Text className="text-lg font-medium text-second-200">
              Nenhum alerta.
            </Text>
          </View>
        </CardContent>
      </Card>

      <Link href={`/(app)/(tabs)/plants/${id}`} asChild>
        <Button
          className="w-full rounded-full border-brand-900"
          variant="outline"
        >
          <Text className="text-brand-900">Ver minha planta</Text>
        </Button>
      </Link>
    </View>
  )
}
