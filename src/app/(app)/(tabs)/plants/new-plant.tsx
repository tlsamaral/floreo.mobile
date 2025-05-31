import { Buffer } from 'buffer'
global.Buffer = global.Buffer || Buffer


import { useState } from 'react'
import { View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Controller, set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { ArrowLeft, ArrowRight, WandSparkles } from 'lucide-react-native'
import * as FileSystem from 'expo-file-system'

import { Text } from '@/components/ui/Text'
import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import PlaceholderImage from '@/../assets/images/image-placeholder.png' // imagem padrão
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { supabase } from '@/lib/supabase'

import { mask } from 'remask'
import usePlantRecommendations from '@/hooks/use-plant-recommendations'
import { usePlantContext } from '@/contexts/plant-context'

const plantSchema = z.object({
  name: z.string().min(1, 'Nome original é obrigatório'),
  friendlyName: z.string().min(1, 'Nome comum é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),


  minTemperatureCelsius: z.coerce
    .number({ invalid_type_error: 'Temperatura mínima deve ser um número' })
    .min(-50, 'Temperatura mínima inválida')
    .max(100, 'Temperatura mínima muito alta'),

  maxTemperatureCelsius: z.coerce
    .number({ invalid_type_error: 'Temperatura máxima deve ser um número' })
    .min(-50, 'Temperatura máxima inválida')
    .max(100, 'Temperatura máxima muito alta'),

  idealLuminosityLx: z.coerce
    .number({ invalid_type_error: 'Luminosidade (lux) deve ser um número' })
    .min(0, 'Lux mínimo deve ser 0')
    .max(200_000, 'Lux máximo excedido'),

  irrigationsPerDay: z.coerce
    .number({ invalid_type_error: 'Irrigações por dia deve ser um número' })
    .min(0, 'Deve ser no mínimo 0')
    .max(24, 'No máximo 24 irrigações por dia'),

  mlPerIrrigation: z.coerce
    .number({ invalid_type_error: 'Volume de irrigação deve ser um número' })
    .min(1, 'Deve ser no mínimo 1 ml'),

  imageUri: z.string().optional(),
})

export type PlantFormData = z.infer<typeof plantSchema>

export default function PlantInfoScreen() {
  const insets = useSafeAreaInsets()
  const { setPlantData } = usePlantContext()
  const { fetchRecommendations, data, error, loading: loadingRecommendations } = usePlantRecommendations()

  const router = useRouter()
  const [imageUri, setImageUri] = useState<string | null>(null)

  const { control, handleSubmit, watch, setValue } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: '',
      friendlyName: '',
      date: '',
      minTemperatureCelsius: 0,
      maxTemperatureCelsius: 0,
      idealLuminosityLx: 0,
      irrigationsPerDay: 0,
      mlPerIrrigation: 0,
    },
  })

  async function handleSelectImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    })

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri
      const fileName = uri.split('/').pop() ?? `imagem-${Date.now()}.jpg`

      // 🔄 Converte o arquivo em blob
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
      const blob = Buffer.from(file, 'base64')

      // 📤 Faz o upload para o bucket 'imagens' (exemplo)
      const { data, error } = await supabase.storage
        .from('floreo') // nome do bucket
        .upload('plants/' + fileName, blob, {
          contentType: 'image/jpeg', // ajuste conforme necessário
          upsert: true,
        })

      if (!data) {
        throw new Error('Erro ao fazer upload')
      }

      const { data: { publicUrl } } = supabase.storage.from('floreo').getPublicUrl(data?.path)
      setImageUri(publicUrl)

      setValue('imageUri', publicUrl)

      if (error) {
        console.error('Erro ao fazer upload:', error)
      } else {
        console.log('Upload feito com sucesso:', data)
      }
    }
  }

  function handleContinue(data: PlantFormData) {
    console.log('Planta:', data)
    setPlantData(data)

    router.push('/(app)/(tabs)/plants/select-floreo')
  }

  const plantOriginalName = watch('name')
  const plantDate = watch('date')
  

  async function handleSuggest() {
  if (!plantOriginalName || !plantDate) {
    Alert.alert('Atenção', 'Nome original e Data da planta são obrigatórias')
    return
  }

  await fetchRecommendations(plantOriginalName, plantDate)

    if (error) {
      Alert.alert('Erro ao buscar recomendações', error)
    } else if (data) {
      console.log('Recomendações:', data)

      // Preencher campos do formulário com os valores recebidos
      setValue('irrigationsPerDay', data.irrigacoes_por_dia)
      setValue('idealLuminosityLx', data.luminosidade_ideal_lx)
      setValue('mlPerIrrigation', data.ml_por_irrigacao)
      setValue('minTemperatureCelsius', data.temperatura_min_celsius)
      setValue('maxTemperatureCelsius', data.temperatura_max_celsius)
    }
  }


  return (
    <ScrollView
      className="flex-1 bg-second-50 px-7 pt-8 relative"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      {/* Voltar */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center gap-2"
      >
        <ArrowLeft size={24} color="#1F3A1C" />
        <Text className="text-lg font-semibold text-brand-900">Voltar</Text>
      </TouchableOpacity>

      <Text className="text-xl font-semibold text-brand-900 mt-2 mb-6 text-center">
        Sobre sua planta
      </Text>

      {/* Seletor de Imagem */}
      <TouchableOpacity
        className="self-center mb-6 border-2 border-brand-100 rounded-full w-32 h-32 items-center justify-center overflow-hidden"
        onPress={handleSelectImage}
      >
        <Image
          source={imageUri ? { uri: imageUri } : PlaceholderImage}
          style={{ width: '100%', height: '100%', borderRadius: 50 }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Formulário */}
      <View className="gap-4">
        <View>
          <Text className="text-lg text-brand-900">Nome original</Text>
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
          <Text className="text-lg text-brand-900">Nome amigável</Text>
          <Controller
            control={control}
            name="friendlyName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nome que você gostaria de dar a sua planta"
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
                onChangeText={(e) => {
                  const maskedValue = mask(e, '99/99/9999')
                  onChange(maskedValue)
                }}
                onBlur={onBlur}
                value={value}
                maxLength={10}
              />
            )}
          />
        </View>

        <Button
        variant="link"
        className="rounded-full items-center flex-row gap-2"
        onPress={handleSuggest}
        disabled={loadingRecommendations}
      >
        <Text className='text-brand-800 text-lg underline'>{loadingRecommendations ? 'Carregando...' : 'Seguir sugestões da IA'}</Text>
        <WandSparkles size={20} color="#2F512D" />
      </Button>


        <View>
          <Text className="text-lg text-brand-900">Temperatura mínima (°C)</Text>
          <Controller
            control={control}
            name="minTemperatureCelsius"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Ex: 18"
                keyboardType="numeric"
                variant="normal-blur"
                inputMode="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
              />
            )}
          />
        </View>

        <View>
          <Text className="text-lg text-brand-900">Temperatura máxima (°C)</Text>
          <Controller
            control={control}
            name="maxTemperatureCelsius"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Ex: 30"
                keyboardType="numeric"
                variant="normal-blur"
                inputMode="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
              />
            )}
          />
        </View>

        <View>
          <Text className="text-lg text-brand-900">Luminosidade ideal (lux)</Text>
          <Controller
            control={control}
            name="idealLuminosityLx"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Ex: 15000"
                keyboardType="numeric"
                variant="normal-blur"
                inputMode="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
              />
            )}
          />
        </View>

        <View>
          <Text className="text-lg text-brand-900">Irrigações por dia</Text>
          <Controller
            control={control}
            name="irrigationsPerDay"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Ex: 2"
                keyboardType="numeric"
                variant="normal-blur"
                inputMode="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
              />
            )}
          />
        </View>

        <View>
          <Text className="text-lg text-brand-900">Mililitros por irrigação (ml)</Text>
          <Controller
            control={control}
            name="mlPerIrrigation"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Ex: 200"
                keyboardType="numeric"
                variant="normal-blur"
                inputMode="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
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
    </ScrollView>
  )
}
