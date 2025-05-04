import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { ArrowRight, X } from 'lucide-react-native'
import { Image, Modal, View } from 'react-native'
import { type BarcodeScanningResult, CameraView } from 'expo-camera'

import PlantScan from '@/../assets/images/scan-plant.gif'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export default function NewEngineScreen() {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)

  const handleScan = () => {
    // Navigate to the screen named "scan-plant"
    router.push('/engines/new-engine/scan-plant')
  }

  function handleOpenCamera() {
    setModalVisible(true)

    setTimeout(() => {
      setModalVisible(false)
      router.push('/engines/new-engine/success')
    }, 2000)
  }

  function handleQRCodeScanned({ data }: BarcodeScanningResult) {
    console.log('QR Code scanned:', data)
  }

  return (
    <View className="flex-1 items-center justify-center bg-second-50 px-9">
      <Text className="text-lg font-medium text-brand-900 text-center">
        Escaneie o QR code do vaso onde sua planta ficará.
      </Text>

      <Image
        source={PlantScan}
        style={{ width: 540, height: 355 }}
        resizeMode="contain"
      />

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
        <View className="flex-1 items-center justify-center bg-black/50">
          <Text className="text-lg font-medium text-brand-900 text-center">
            Escaneie o QR code do vaso onde sua planta ficará.
          </Text>
        </View>
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={handleQRCodeScanned}
        />

        <Button
          variant="link"
          className="rounded-full items-center flex-row gap-2 w-full"
          onPress={() => setModalVisible(false)}
        >
          <Text className="text-lg text-second-100">Fechar</Text>
          <X size={18} color={'#F8FAEC'} />
        </Button>
      </Modal>
    </View>
  )
}
