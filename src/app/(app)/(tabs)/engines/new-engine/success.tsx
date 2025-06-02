import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { ArrowRight, CircleCheck } from 'lucide-react-native'

import { Text } from '@/components/ui/Text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import dayjs = require('dayjs')

export default function NewEngineScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [device, setDevice] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function loadDevice() {
      const { data, error } = await supabase
        .from('devices')
        .select('id, numeration, name')
        .eq('id', Number(id))
        .single()

      if (!error && data) {
        setDevice(data)
      }

      setLoading(false)
    }

    loadDevice()
  }, [id])

  if (loading || !device) return null

  return (
    <View className="flex-1 items-center bg-second-50 px-9 gap-4 py-9">
      <Alert icon={CircleCheck} variant="success" className="max-w-xl">
        <AlertTitle className="text-brand-300">Tudo pronto.</AlertTitle>
        <AlertDescription className="text-brand-300">
          Seu Flóreo foi conectado com sucesso. Agora é só aproveitar e
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
            Nome: {device.name || '---'}
          </Text>
          <Text className="text-base font-medium text-brand-900">
            Data do setup: {dayjs().format('DD/MM/YYYY')} {/* ou use dayjs(plantDate).format(...) se necessário */}
          </Text>
          <Text className="text-base font-medium text-brand-900">
            Vaso: {device.numeration} - Identificado ✅
          </Text>
        </CardContent>
      </Card>

      <Button
        variant="brand"
        className="flex-row items-center gap-2 rounded-full w-full bg-brand-900 mt-4"
        onPress={() => router.push('/(app)/(tabs)/engines')}
      >
        <Text className="text-second-50">Meu painel</Text>
        <ArrowRight size={20} color={'#F8FAEC'} />
      </Button>
    </View>
  )
}
