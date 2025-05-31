import { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Alert, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { usePlantContext } from '@/contexts/plant-context'
import { useAuth } from '@/contexts/auth-context'
import { ArrowLeft, ArrowRight } from 'lucide-react-native'

type Floreo = {
  id: number
  name: string
  numeration: string
  status: boolean
}

export default function SelectFloreoScreen() {
  const router = useRouter()
  const { setFloreoId } = usePlantContext()
  const [floreos, setFloreos] = useState<Floreo[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  async function loadFloreos() {
    setLoading(true)

    const userId = user?.id

    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado')
      return
    }

    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('user_id', userId)

    console.log(data)

    if (error) {
      Alert.alert('Erro ao carregar floreos', error.message)
    } else {
      const mappedFloreos = data.map((item) => ({
        id: item.id,
        name: item.name ?? '',
        numeration: item.numeration ?? '',
        status: item.status ?? false,
      }))
      setFloreos(mappedFloreos)
    }

    setLoading(false)
  }

  function handleSelect(id: number) {
    setSelectedId(id)
  }

  function handleContinue() {
    if (!selectedId) {
      Alert.alert('Selecione um flóreo', 'Você deve escolher um flóreo para continuar.')
      return
    }

    setFloreoId(String(selectedId))
    router.push('/(app)/(tabs)/plants/plant-info') // ou a próxima etapa
    console.log('Floreo selecionado:', selectedId)
  }

  useEffect(() => {
    loadFloreos()
  }, [])

  return (
    <ScrollView className="flex-1 bg-second-50 px-6 pt-10">
      <Pressable className="flex-row items-center gap-2 mb-6">
        <ArrowLeft size={24} color="#1F3A1C" onPress={() => router.back()} />
        <Text className="text-lg font-semibold text-brand-900">Informações da planta</Text>
      </Pressable>

      <Text className="text-xl font-bold text-brand-900 text-center mb-6">Escolha seu Flóreo</Text>

      {floreos.map((item) => (
        <TouchableOpacity
          key={item.id}
          className={`border-2 rounded-xl p-4 mb-4 ${
            selectedId === item.id ? 'border-brand-500 bg-brand-50' : 'border-second-600 bg-second-50'
          }`}
          onPress={() => handleSelect(item.id)}
        >
          <Text className="text-sm text-brand-700">{item.numeration}</Text>
          <Text className="text-lg font-semibold text-brand-900">{item.name}</Text>
        </TouchableOpacity>
      ))}

      <Button
        variant="brand"
        className="rounded-full mt-10 flex-row items-center justify-center gap-2"
        onPress={handleContinue}
        disabled={loading}
      >
        <Text className="text-lg">Continuar</Text>
        <ArrowRight color={'#E8EFC1'} size={20} />
      </Button>
    </ScrollView>
  )
}
