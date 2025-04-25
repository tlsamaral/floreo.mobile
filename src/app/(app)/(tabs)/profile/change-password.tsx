import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const changePasswordSchema = z.object({
  actualPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(1, 'Nova senha é obrigatória'),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
})

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export default function ChangePassword() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      actualPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function handleChangePassword(data: ChangePasswordFormData) {
    console.log('Change Profile Data:', data)
  }

  return (
    <View className="flex-1 items-center px-7 gap-5 py-10">
      <View className="flex-col gap-1">
        <Text className="text-lg text-brand-900">Senha atual</Text>
        <Controller
          control={control}
          name="actualPassword"
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
        <Text className="text-lg text-brand-900">Nova senha</Text>
        <Controller
          control={control}
          name="newPassword"
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
        <Text className="text-lg text-brand-900">Confirmar senha</Text>

        <Controller
          control={control}
          name="confirmPassword"
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

      <Button
        variant="brand"
        className="flex-row items-center gap-2 rounded-full w-full bg-brand-900 mt-4"
        onPress={handleSubmit(handleChangePassword)}
      >
        <Text>Alterar senha</Text>
      </Button>
    </View>
  )
}
