import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { ArrowRight, X } from 'lucide-react-native'
import { Image, Modal, View, Alert } from 'react-native'
import { type BarcodeScanningResult, CameraView } from 'expo-camera'
import PlantScan from '@/../assets/images/scan-plant.gif'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NewEngineScreen() {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  const [scanned, setScanned] = useState(false)

  function handleOpenCamera() {
    setModalVisible(true)
  }

  async function handleQRCodeScanned({ data }: BarcodeScanningResult) {
    if (scanned) return // impede múltiplas leituras
    setScanned(true)
    console.log(data)

    try {
      if (!data.startsWith('FLR-')) {
        Alert.alert('Código inválido', 'Este QR Code não é reconhecido.')
        return
      }

      const { data: userInfo, error: userError } = await supabase.auth.getUser()
      const userId = userInfo?.user?.id

      if (userError || !userId) {
        Alert.alert('Erro', 'Não foi possível obter o usuário logado.')
        return
      }

      const { data: floreosData } = await supabase.from('devices').select('*')
      console.log(floreosData)
      // Verifica se o dispositivo existe com aquela numeração
      const { data: foundDevices, error: deviceError } = await supabase
        .from('devices')
        .select('id, user_id')
        .eq('numeration', data.trim())
        .limit(1)

      const deviceData = foundDevices?.[0]

      console.log('QRCode original:', data)
      console.log('QRCode sanitizado:', JSON.stringify(data.trim()))

      console.log(deviceError, deviceData)
      if (deviceError || !deviceData) {
        Alert.alert('Dispositivo não encontrado', 'Não encontramos esse Flóreo no sistema.')
        return
      }

      if (deviceData.user_id && deviceData.user_id !== userId) {
        Alert.alert('Já associado', 'Este Flóreo já está vinculado a outro usuário.')
        return
      }

      // Associa o dispositivo ao usuário
      const { error: updateError } = await supabase
        .from('devices')
        .update({ user_id: userId, setup_date: new Date().toISOString() })
        .eq('id', deviceData.id)

      if (updateError) {
        Alert.alert('Erro', 'Falha ao associar o Flóreo.')
        return
      }

      Alert.alert('Tudo certo!', 'Flóreo conectado com sucesso!')
      setModalVisible(false)
      router.push(`/(app)/(tabs)/engines/new-engine/success?id=${deviceData.id}`) // redireciona para lista de dispositivos

    } catch (e) {
      Alert.alert('Erro inesperado', 'Algo deu errado ao escanear o QR code.')
      console.error(e)
    } finally {
      setTimeout(() => setScanned(false), 3000) // permite novo scan depois de 3s
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-second-50 px-9">
      <Text className="text-lg font-medium text-brand-900 text-center">
        Escaneie o QR code do vaso onde sua planta ficará.
      </Text>

      <Image source={PlantScan} style={{ width: 540, height: 355 }} resizeMode="contain" />

      <Button
        variant="brand"
        className="rounded-full items-center flex-row gap-2 w-full"
        onPress={handleOpenCamera}
      >
        <Text className="text-lg">Escanear</Text>
        <ArrowRight size={20} color={'#F8FAEC'} />
      </Button>

      <Text className="text-sm text-brand-900 text-center">
        Você deve encontrar o QR Code na região inferior do seu vaso.
      </Text>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View className="flex-1 bg-black/80 items-center justify-center">
          <Text className="text-lg font-medium text-second-100 text-center mb-4">
            Escaneie o QR code do vaso onde sua planta ficará.
          </Text>

          <CameraView
            style={{ width: '100%', height: '80%' }}
            onBarcodeScanned={handleQRCodeScanned}
          />

          <Button
            variant="link"
            className="rounded-full items-center flex-row gap-2 w-full mt-4"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-lg text-second-100">Fechar</Text>
            <X size={18} color={'#F8FAEC'} />
          </Button>
        </View>
      </Modal>
    </View>
  )
}
