import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'
import { useTheme } from '@react-navigation/native'
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react-native'
import { Text, View } from 'react-native'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative bg-background w-full rounded-lg border border-border p-4 shadow shadow-foreground/10',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive',
        warning: 'bg-[#664D16]/85 border-accent-100 border-2',
        success: 'bg-[#0F410D] border border-primary-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Alert = forwardRef<
  ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof alertVariants> & {
      icon: LucideIcon
      iconSize?: number
      iconClassName?: string
    }
>(
  (
    {
      className,
      variant,
      children,
      icon: Icon,
      iconSize = 20,
      iconClassName,
      ...props
    },
    ref,
  ) => {
    const { colors } = useTheme()
    const iconColor =
      variant === 'destructive'
        ? colors.notification
        : variant === 'warning'
          ? '#FFCF50'
          : variant === 'success'
            ? '#77A974'
            : colors.text
    return (
      <View
        ref={ref}
        role="alert"
        className={alertVariants({ variant, className })}
        {...props}
      >
        <View className="absolute left-3.5 top-4 -translate-y-0.5 mt-1">
          <Icon size={iconSize} color={iconColor} />
        </View>
        {children}
      </View>
    )
  },
)
Alert.displayName = 'Alert'

const AlertTitle = forwardRef<
  ElementRef<typeof Text>,
  ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      'pl-7 py-2 mb-1 font-medium text-xl leading-none tracking-tight text-foreground',
      className,
    )}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<
  ElementRef<typeof Text>,
  ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('pl-7 text-base leading-relaxed text-foreground', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
