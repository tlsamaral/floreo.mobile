import { Input } from '@/src/components/input'
import { View } from 'react-native'

export default function SignIn() {
  return (
    <View className="flex-1">
      <Input placeholder="Digite seu email" variant="light-blur" />
    </View>
  )
}
