import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'
import { TextInput } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'web:flex web:w-full rounded-md border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring web:focus-visible:ring-offset-0',
  {
    variants: {
      size: {
        default:
          'h-10 w-full web:py-2 native:h-12 native:text-lg native:leading-[1.25]',
        sm: 'h-8 px-2 text-sm native:h-10',
        lg: 'h-12 px-4 text-base native:h-14',
      },
      variant: {
        default: '',
        ghost: 'bg-transparent border-transparent focus-visible:ring-0',
        light:
          'bg-[#FDFDF9]/10 border border-brand-50 placeholder:text-brand-100/40 text-brand-100',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
)

type InputProps = ComponentPropsWithoutRef<typeof TextInput> &
  VariantProps<typeof inputVariants> & {
    placeholderClassName?: string
  }

const Input = forwardRef<ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderClassName, size, variant, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          inputVariants({ size, variant }),
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className,
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input, inputVariants }
export type { InputProps }
