import { useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { ArrowLeft, ArrowRight } from 'lucide-react-native'

import { Text } from '@/components/ui/Text'
import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import PlaceholderImage from '@/../assets/images/image-placeholder.png' // imagem padrão

const plantSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  species: z.string().min(1, 'Espécie é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
})

type PlantFormData = z.infer<typeof plantSchema>

export default function PlantInfoScreen() {
  const router = useRouter()
  const [imageUri, setImageUri] = useState<string | null>(null)

  const { control, handleSubmit } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: '',
      species: '',
      date: '',
    },
  })

  async function handleSelectImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    })

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri)
    }
  }

  function handleContinue(data: PlantFormData) {
    console.log('Planta:', data)
    router.push('/engines/new-engine')
  }

  return (
    <View className="flex-1 bg-second-50 px-7 pt-12">
      {/* Voltar */}
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1F3A1C" />
      </TouchableOpacity>

      <Text className="text-xl font-semibold text-brand-900 mt-2 mb-6 text-center">
        Sobre sua planta
      </Text>

      {/* Seletor de Imagem */}
      <TouchableOpacity
        className="self-center mb-6 border-[2px] border-brand-100 rounded-full w-32 h-32 items-center justify-center"
        onPress={handleSelectImage}
      >
        <Image
          source={imageUri ? { uri: imageUri } : PlaceholderImage}
          style={{ width: 100, height: 100, borderRadius: 50 }}
          resizeMode="cover"
        />
        {!imageUri && (
          <Text className="text-xs mt-2 text-brand-900">Selecionar foto</Text>
        )}
      </TouchableOpacity>

      {/* Formulário */}
      <View className="gap-4">
        <View>
          <Text className="text-lg text-brand-900">Nome</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nome da sua planta"
                variant="normal-blur"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>

        <View>
          <Text className="text-lg text-brand-900">Espécie</Text>
          <Controller
            control={control}
            name="species"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Selecione a espécie"
                variant="normal-blur"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>

        <View>
          <Text className="text-lg text-brand-900">Data do plantio</Text>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="DD/MM/AAAA"
                variant="normal-blur"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>
      </View>

      <Button
        variant="brand"
        className="rounded-full items-center flex-row gap-2 w-full mt-10"
        onPress={handleSubmit(handleContinue)}
      >
        <Text className="text-lg">Continuar</Text>
        <ArrowRight size={20} color={'#F8FAEC'} />
      </Button>
    </View>
  )
}
