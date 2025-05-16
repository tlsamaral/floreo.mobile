import { ChevronRight } from 'lucide-react-native'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Image, View } from 'react-native'
import { Text } from './ui/Text'
import { Link } from 'expo-router'

export function PlantCard() {
  return (
    <Link href="/(app)/(tabs)/plants/1">
      <Card className="bg-second-200 w-full border border-brand-900 flex-row px-4 items-center">
        <View>
          <Image
            source={require('../../assets/images/plant-base-image.png')}
            className="size-[60px] rounded-lg"
          />
        </View>
        <View className="flex-1">
          <CardHeader className="flex-row items-center gap-1 pb-2">
            <View className="flex-row gap-1 max-w-[255px] overflow-hidden">
              <Text className="text-2xl font-medium text-second-900">
                Samabaia
              </Text>
              {/* <Text className="text-base font-medium text-second-700 truncate">
                Nephrolepis exaltata
              </Text> */}
            </View>
          </CardHeader>
          <CardContent className="flex-row items-center gap-2">
            <View className="size-2 rounded-full bg-danger-500" />
            <Text className="text-base font-medium text-second-700">
              Desativado
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
