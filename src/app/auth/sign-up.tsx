import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Text } from '@/components/ui/Text'
import { Text as NativeText } from 'react-native'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AntDesign } from '@expo/vector-icons'

const signUpSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha é obrigatória'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUp() {
  const { control, register, handleSubmit, setValue, formState } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleSignUp(data: SignUpFormData) {
    console.log('Sign Up Data:', data)
  }

  return (
    <View className="flex-1 gap-8 justify-center items-center">
      <View className="gap-8 w-full mt-auto">
        <View>
          <Text className="text-2xl font-bold antialiased leading-tight text-center">
            Novo por aqui?
          </Text>
          <NativeText className="text-brand-100 font-medium text-center text-lg">
            Crie sua conta e cultive
          </NativeText>
        </View>

        <View className="flex-col gap-1 mt-auto">
          <Text className="text-lg">Nome</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon={
                  <AntDesign
                    name="user"
                    size={20}
                    color="#CADEC9"
                    className="text-base font-medium"
                  />
                }
                placeholder="Digite seu nome"
                variant="light"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>

        <View className="flex-col gap-1 mt-auto">
          <Text className="text-lg">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon={
                  <AntDesign
                    name="mail"
                    size={20}
                    color="#CADEC9"
                    className="text-base font-medium"
                  />
                }
                placeholder="Digite seu email"
                variant="light"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {/* <TextInput placeholder="Digite seu email" variant="light" /> */}
        </View>

        <View className="flex-col gap-1">
          <Text className="text-lg">Senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon={
                  <AntDesign
                    name="lock1"
                    size={20}
                    color="#CADEC9"
                    className="text-base font-medium"
                  />
                }
                placeholder="Digite sua senha"
                variant="light"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
              />
            )}
          />
          {/* <TextInput placeholder="Sua senha" variant="light" secureTextEntry /> */}
        </View>

        <View className="flex-col gap-1">
          <Text className="text-lg">Confirme sua senha</Text>

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon={
                  <AntDesign
                    name="lock1"
                    size={20}
                    color="#CADEC9"
                    className="text-base font-medium"
                  />
                }
                placeholder="Confirme sua senha"
                variant="light"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
              />
            )}
          />
        </View>
      </View>

      <View className="gap-5 w-full" id="buttons">
        <Button
          variant="second"
          className="w-full rounded-full"
          onPress={handleSubmit(handleSignUp)}
        >
          <Text className="font-semibold">Acessar</Text>
        </Button>

        <Separator />

        <Button variant="second" className="w-full rounded-full flex-row gap-2">
          <AntDesign
            name="google"
            size={20}
            className="text-brand-600"
            color="#4D864A"
          />
          <Text className="font-semibold">Me cadastrar com Google</Text>
        </Button>

        <View className="flex-row gap-1 items-center justify-center">
          <NativeText className="text-second-100">
            Já possui uma conta?
          </NativeText>
          <Link
            href="/auth/sign-in"
            className="text-tertiary-200 underline underline-offset-1 text-base"
          >
            Acesse aqui
          </Link>
        </View>

        <NativeText className="text-center mt-11 text-second-50/40 font-medium mb-6">
          Flóreo, cultivando inteligência.
        </NativeText>
      </View>
    </View>
  )
}
