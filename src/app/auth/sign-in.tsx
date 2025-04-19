import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Text } from '@/components/ui/Text'
import { Text as NativeText } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignIn() {
  const router = useRouter()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(data: SignInFormData) {
    console.log('Sign in Data:', data)
  }

  return (
    <View className="flex-1 gap-8 justify-center items-center">
      <View className="gap-8 w-full mt-auto">
        <View>
          <Text className="text-2xl font-bold antialiased leading-tight text-center">
            Bem vindo de volta
          </Text>
          <NativeText className="text-brand-100 font-medium text-center text-lg">
            Acesse sua conta
          </NativeText>
        </View>

        <View className="flex-col gap-1 mt-auto">
          <Text className="text-lg">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon={<AntDesign name="mail" color="#CADEC9" size={20} />}
                placeholder="Digite seu email"
                variant="light"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>

        <View className="flex-col gap-1">
          <Text className="text-lg">Senha</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon={<AntDesign name="lock" color="#CADEC9" size={20} />}
                placeholder="Digite sua senha"
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
          onPress={handleSubmit(handleSignIn)}
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
          <Text className="font-semibold">Acessar com Google</Text>
        </Button>

        <View className="flex-row gap-1 items-center justify-center">
          <NativeText className="text-second-100">
            Não tem uma conta?
          </NativeText>
          <Link
            href="/auth/sign-up"
            className="text-tertiary-200 underline underline-offset-1 text-base"
          >
            Cadastre-se
          </Link>
        </View>

        <NativeText className="text-center mt-11 text-second-50/40 font-medium mb-6">
          Flóreo, cultivando inteligência.
        </NativeText>
      </View>
    </View>
  )
}
