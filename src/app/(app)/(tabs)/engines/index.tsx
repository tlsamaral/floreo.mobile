import { useEffect, useState } from 'react'
import { ScrollView, View, Alert, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { FloreoCard } from '@/components/floreo-card'
import { NewFloreoButton } from '@/components/new-floreo-button'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { supabase } from '@/lib/supabase'

export type FloreoDevice = {
  id: number
  name: string | null
  numeration: string | null
  status: boolean | null
}

export default function EngineScreen() {
  const insets = useSafeAreaInsets()
  const [devices, setDevices] = useState<FloreoDevice[]>([])
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

      if (error) {
        Alert.alert('Erro ao buscar dispositivos', error.message)
      } else {
        setDevices(data ?? [])
      }

      setLoading(false)
    }

    loadDevices()
  }, [])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-second-50">
        <ActivityIndicator size="large" color="#504120" />
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-second-50 px-8 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="gap-4">
        <Text className="text-xl text-brand-800 font-medium">
          {devices.length > 0 ? 'Esses são seus Floreos' : 'Não começou ainda?'}
        </Text>

        {devices.map((device) => (
          <FloreoCard
            key={device.id}
            id={device.id}
            numeration={device.numeration ?? ''}
            status={device.status ?? false}
          />
        ))}

        {devices.length > 0 ? (
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
