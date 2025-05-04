import { Text } from '@/components/ui/Text'
import { ArrowRight, CircleCheck } from 'lucide-react-native'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'

export default function NewEngineScreen() {
  const router = useRouter()

  return (
    <View className="flex-1 items-center bg-second-50 px-9 gap-4 py-9">
      <Alert icon={CircleCheck} variant="success" className="max-w-xl">
        <AlertTitle className="text-brand-300">Tudo pronto. </AlertTitle>
        <AlertDescription className="text-brand-300">
          Seu Floreo foi conectado com sucesso. Agora é só aproveitar e
          acompanhar sua planta diretamente pelo aplicativo. 🌱✨
        </AlertDescription>
      </Alert>

      <Card className="bg-second-200 w-full border border-brand-900">
        <CardHeader className="flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="text-second-900">Revisão</CardTitle>
          <CircleCheck size={20} color="#504120" />
        </CardHeader>
        <CardContent className="gap-2">
          <Text className="text-base font-medium text-brand-900">
            Nome: Samambaia
          </Text>
          <Text className="text-base font-medium text-brand-900">
            Espécie: Nephrolepis exaltata
          </Text>
          <Text className="text-base font-medium text-brand-900">
            Data: 30/03/2025
          </Text>
          <Text className="text-base font-medium text-brand-900">
            Vaso: FLR-4299 - Identificado ✅
          </Text>
        </CardContent>
      </Card>

      <Button
        variant="brand"
        className="flex-row items-center gap-2 rounded-full w-full bg-brand-900 mt-4"
        onPress={() => router.push('/engines')}
      >
        <Text className="text-second-50">Meu paínel</Text>
        <ArrowRight size={20} color={'#F8FAEC'} />
      </Button>
    </View>
  )
}
