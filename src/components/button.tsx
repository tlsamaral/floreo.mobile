import { Pressable, Text, View } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

const buttonVariants = {
  primary: {
    button: 'w-full px-5 py-3 rounded-sm bg-primary-900',
    text: 'text-secondary-100 font-medium text-base',
  },
  secondary: {
    button: 'w-full px-5 py-3 rounded-sm bg-secondary-50',
    text: 'text-primary-900 font-medium text-base',
  },
}

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  text?: string
  variant?: keyof typeof buttonVariants
  icon?: ReactNode
}

export function Button({
  text,
  variant = 'primary',
  icon,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      className={cn(
        `${buttonVariants[variant].button} flex-row items-center justify-center`,
        props.className,
      )}
    >
      <View className="flex-row items-center space-x-2">
        {icon && <View>{icon}</View>}
        {text && <Text className={buttonVariants[variant].text}>{text}</Text>}
      </View>
    </Pressable>
  )
}
