import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const changeAddressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  zipCode: z.string().min(1, 'CEP é obrigatório'),
  country: z.string().min(1, 'País é obrigatório'),
})

type ChangeAddressFormData = z.infer<typeof changeAddressSchema>

export default function ChangeAddress() {
  const { control, handleSubmit } = useForm<ChangeAddressFormData>({
    resolver: zodResolver(changeAddressSchema),
    defaultValues: {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  })

  async function handleChangeAddress(data: ChangeAddressFormData) {
    console.log('Change Address Data:', data)
  }

  return (
    <View className="flex-1 items-center px-7 gap-5 py-10">
      <View className="flex-row gap-2 w-full">
        <View className="flex-col gap-1 flex-1 ">
          <Text className="text-lg text-brand-900">Rua</Text>
          <Controller
            control={control}
            name="street"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite a rua"
                variant="normal-blur"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>

        <View className="flex-col gap-1 w-32">
          <Text className="text-lg text-brand-900">Número</Text>
          <Controller
            control={control}
            name="number"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Número"
                variant="normal-blur"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>
      </View>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">Bairro</Text>
        <Controller
          control={control}
          name="neighborhood"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Bairro"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">Cidade</Text>
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Cidade"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">Estado</Text>
        <Controller
          control={control}
          name="state"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Estado"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">CEP</Text>
        <Controller
          control={control}
          name="zipCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="CEP"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">País</Text>
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="País"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <Button
        variant="brand"
        className="flex-row items-center gap-2 rounded-full w-full bg-brand-900 mt-4"
        onPress={handleSubmit(handleChangeAddress)}
      >
        <Text>Atualizar Endereço</Text>
      </Button>
    </View>
  )
}
