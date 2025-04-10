import { View, Text } from 'react-native'
import { Input, inputVariants, type InputProps } from './ui/Input'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CustomInputProps extends InputProps {
  icon?: ReactNode
  prefix?: string
}

export function TextInput({
  icon,
  prefix,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: CustomInputProps) {
  return (
    <View
      className={cn(
        'flex-row items-center gap-2',
        inputVariants({ size, variant }),
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        className,
      )}
    >
      {icon && <View className="mr-2">{icon}</View>}

      {prefix && (
        <Text className="text-brand-100 text-base font-medium mr-1">
          {prefix}/
        </Text>
      )}

      <Input
        variant={variant}
        size={size}
        className={cn('flex-1 p-0 bg-transparent border-0', className)}
        {...props}
      />
    </View>
  )
}
