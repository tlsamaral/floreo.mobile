import { ChevronRight } from 'lucide-react-native'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Image, View } from 'react-native'
import { Text } from './ui/Text'
import { Link } from 'expo-router'
import dayjs from 'dayjs'

interface PlantCardProps {
  id: number
  name: string
  friendlyName: string
  plantingDate: string
  imageUri: string
}

export function PlantCard({ id, name, friendlyName, plantingDate, imageUri }: PlantCardProps) {
  return (
    <Link href={`/(app)/(tabs)/plants/${id}`}>
      <Card className="bg-second-200 w-full border border-brand-900 flex-row px-4 items-center">
        <View>
          <Image
            source={{ uri: imageUri }}
            className="size-[60px] rounded-lg"
          />
        </View>
        <View className="flex-1">
          <CardHeader className="flex-row items-center gap-1 pb-2">
            <View className="flex-row items-baseline gap-1 max-w-[255px] overflow-hidden">
              <Text className="text-2xl font-medium text-second-900">
                {friendlyName}
              </Text>
              <Text className="text-base font-medium text-second-700 truncate">
                ,{' '}{name}
              </Text>
            </View>
          </CardHeader>
          <CardContent className="flex-row items-center gap-2">
            <View className="size-2 rounded-full bg-green-500" />
            <Text className="text-base font-medium text-second-700">
              Plantada em: {dayjs(plantingDate).format('DD/MM/YYYY')}
            </Text>
          </CardContent>
        </View>
        <View className="fitems-end justify-center">
          <ChevronRight size={24} color="#504120" />
        </View>
      </Card>
    </Link>
  )
}
