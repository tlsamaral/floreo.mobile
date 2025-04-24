import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Text } from '@/components/ui/Text'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const changeProfileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  gender: z.enum(['male', 'female']),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  username: z.string().min(1, 'Usuário é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
})

type ChangeProfileFormData = z.infer<typeof changeProfileSchema>

export default function ChangeProfile() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(changeProfileSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
    },
  })

  async function handleChangeProfile(data: ChangeProfileFormData) {
    console.log('Change Profile Data:', data)
  }

  return (
    <View className="flex-1 items-center px-7 gap-5 py-10">
      <View className="flex-col gap-1">
        <Text className="text-lg text-brand-900">Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Seu nome completo"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex-col gap-1">
        <Text className="text-lg text-brand-900">Senha</Text>

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Selecione seu gênero"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <Separator />

      <View className="flex-col gap-1">
        <Text className="text-lg text-brand-900">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Seu email"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex-col gap-1">
        <Text className="text-lg text-brand-900">Usuário</Text>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Seu usuário"
              variant="normal-blur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex-col gap-1">
        <Text className="text-lg text-brand-900">Telefone</Text>

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="(XX) XXXXX-XXXX"
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
        onPress={handleSubmit(handleChangeProfile)}
      >
        <Text>Atualizar meu perfil</Text>
      </Button>
    </View>
  )
}
