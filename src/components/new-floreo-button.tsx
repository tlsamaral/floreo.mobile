import { CirclePlus } from 'lucide-react-native'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Text } from './ui/Text'

interface NewFloreoButtonProps {
  title: string
  description: string
}

export function NewFloreoButton({ title, description }: NewFloreoButtonProps) {
  return (
    <Card className="bg-brand-500 w-full border border-brand-900 ">
      <CardHeader className="flex-row items-center justify-between gap-2 pb-2">
        <CardTitle className="text-second-100">{title}</CardTitle>
        <CirclePlus size={24} color="#E8EFC1" />
      </CardHeader>
      <CardContent className="flex-row items-center gap-2">
        <Text className="text-base font-medium text-second-300">
          {description}
        </Text>
      </CardContent>
    </Card>
  )
}
