// components/PlantCard.tsx
import { View, Image } from 'react-native'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { Separator } from '@/components/ui/Separator'
import { Button } from '@/components/ui/Button'
import dayjs from 'dayjs'
import { Link } from 'expo-router'

type PlantHighlighProps = {
  id: number
  name: string
  friendlyName: string
  plantingDate: string
  humidityStatus: string
  luminosityStatus: string
  imageUri: string
}

export function PlantHighligh({ 
  id,
  name, 
  imageUri,
  friendlyName, 
  plantingDate, 
  humidityStatus, 
  luminosityStatus,
}: PlantHighlighProps) {

  return (
    <Card className="bg-second-200 w-full border border-brand-900">
      <CardHeader className="flex-row items-center gap-4">
        <Image
          source={{ uri: imageUri }}
          className="size-[60px] rounded-lg"
        />
        <View>
          <Text className="text-xl font-medium text-brand-800 text-left w-full">{friendlyName}</Text>
          <Text className="text-sm font-medium text-brand-800 text-left w-full">{name}</Text>
          <Text className="text-sm font-medium text-brand-800 text-left w-full">Data do plantio: {dayjs(plantingDate).format('DD/MM/YYYY')}</Text>
        </View>
      </CardHeader>

      <CardContent className="gap-4">
        <Separator className="opacity-50" />

        <View className="flex-row items-center justify-between gap-4">
          <Text className="text-base font-medium text-brand-800">{humidityStatus}</Text>
          <View className="size-4 bg-blue-500 rounded-full" />
        </View>

        <View className="flex-row items-center justify-between gap-4">
          <Text className="text-base font-medium text-brand-800">{luminosityStatus}</Text>
          <View className="size-4 bg-yellow-500 rounded-full" />
        </View>

        <Link href={`/plants/${id}`} asChild>
          <Button variant="outline" className="rounded-full border-brand-900" size="sm" >
            <Text className="text-sm font-medium text-brand-800">Ver mais detalhes</Text>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
