import { TextInput } from '@/components/input'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Text } from '@/components/ui/Text'
import { Text as NativeText } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// import GoogleIcon from '@/assets/icons/google.svg'

export default function SignIn() {
  const router = useRouter()
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
          <TextInput
            icon={<AntDesign name="mail" color="#CADEC9" size={20} />}
            placeholder="Digite seu email"
            variant="light"
          />
        </View>

        <View className="flex-col gap-1">
          <Text className="text-lg">Senha</Text>
          <TextInput
            icon={<AntDesign name="lock1" color="#CADEC9" size={20} />}
            placeholder="Sua senha"
            variant="light"
            secureTextEntry={true}
          />
        </View>
      </View>

      <View className="gap-5 w-full" id="buttons">
        <Button
          variant="second"
          className="w-full rounded-full"
          onPress={() => router.push('/(tabs)/home')}
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
