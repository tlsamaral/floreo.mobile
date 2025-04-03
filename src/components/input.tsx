import { TextInput, View } from 'react-native'

interface InputProps extends React.ComponentProps<typeof TextInput> {
  icon?: React.ReactNode
  variant?: 'default' | 'light-blur'
}
export function Input({
  icon: Icon,
  variant = 'default',
  ...props
}: InputProps) {
  if (variant === 'light-blur') {
    return (
      <View className="h-10 text-primary-50 border border-primary-50 rounded-md flex-row items-center w-full bg-[#fdfdf9]/10 filter backdrop-blur">
        {Icon && Icon}
        <TextInput {...props} className="flex-1 p-2" />
      </View>
    )
  }

  return (
    <View className="h-10 text-primary-50 border border-primary-50 rounded-md flex-row items-center w-full">
      {Icon && Icon}
      <TextInput {...props} className="flex-1 p-2" />
    </View>
  )
}
