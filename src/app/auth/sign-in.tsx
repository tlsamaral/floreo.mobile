import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Text } from '@/components/ui/Text'
import { Text as NativeText } from 'react-native'
import { Link } from 'expo-router'
import { View } from 'react-native'

// import GoogleIcon from '@/assets/icons/google.svg'

export default function SignIn() {
  return (
    <View className="flex-1 gap-8 justify-center items-center">
      <View className="gap-8 w-full mt-auto">
        <View>
          <Text className="text-2xl font-bold antialiased leading-tight text-center">
            Bem vindo de volta
          </Text>
          <NativeText className="text-brand-200 text-center text-lg">
            Acesse sua conta
          </NativeText>
        </View>

        <View className="flex-col gap-1 mt-auto">
          <Text className="text-lg">Email</Text>
          <TextInput placeholder="Digite seu email" variant="light" />
        </View>

        <View className="flex-col gap-1">
          <Text className="text-lg">Senha</Text>
          <TextInput
            placeholder="Sua senha"
            variant="light"
            secureTextEntry={true}
          />
        </View>
      </View>

      <View className="gap-5 w-full" id="buttons">
        <Button variant="second" className="w-full rounded-full">
          <Text className="font-semibold">Acessar</Text>
        </Button>

        <Separator />

        <Button variant="second" className="w-full rounded-full">
          {/* <GoogleIcon /> */}
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

        <NativeText className="text-center mt-11 text-second-50/40 font-medium">
          Flóreo, cultivando inteligência.
        </NativeText>
      </View>
    </View>
  )
}
