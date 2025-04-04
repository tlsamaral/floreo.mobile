import { Input } from '../../components/ui/Input'
import { View } from 'react-native'

export default function SignIn() {
  return (
    <View className="flex-1 justify-center items-center">
      <Input placeholder="Digite seu email" />
    </View>
  )
}
