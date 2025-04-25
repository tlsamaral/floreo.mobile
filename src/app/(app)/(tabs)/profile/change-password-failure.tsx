import { TextInput } from '@/components/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { CircleAlert } from 'lucide-react-native'
import { View } from 'react-native'

export default function ChangePassword() {
  return (
    <View className="flex-1 items-center px-7 gap-5 py-10">
      <Alert icon={CircleAlert} variant="warning" className="max-w-xl">
        <AlertTitle className="text-[#FFCF50]">Ops 😓.</AlertTitle>
        <AlertDescription className="text-[#FFCF50]">
          Este usuário utiliza o sistema com login social, não é possível
          alterar a senha.
        </AlertDescription>
      </Alert>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">Senha atual</Text>
        <TextInput
          placeholder="Senha atual"
          variant="normal-blur"
          editable={false}
          value="********"
        />
      </View>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">Nova senha</Text>
        <TextInput
          placeholder="Nova senha"
          variant="normal-blur"
          editable={false}
          value="********"
        />
      </View>

      <View className="flex-col gap-1 w-full">
        <Text className="text-lg text-brand-900">Confirmar senha</Text>
        <TextInput
          placeholder="Confirmar senha"
          variant="normal-blur"
          editable={false}
          value="********"
        />
      </View>

      <Button
        variant="brand"
        className="flex-row items-center gap-2 rounded-full w-full bg-brand-900 mt-4"
        disabled
      >
        <Text className="text-white">Alterar senha</Text>
      </Button>
    </View>
  )
}
