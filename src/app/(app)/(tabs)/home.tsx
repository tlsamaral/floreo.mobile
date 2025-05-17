import { FloreoCard } from '@/components/floreo-card'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import { Text } from '@/components/ui/Text'
import { FlatList, Image, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  return (
    <ScrollView
      className="flex-1 bg-second-50"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="flex-1 items-center gap-4 py-7 px-7">
        <Card className="w-full bg-brand-600 border-brand-900">
          <CardContent className="p-0 flex-row gap-10">
            <View className="p-4 w-[60%] justify-between">
              <View>
                <Text className="text-lg font-medium text-second-300">
                  Como vai?
                </Text>

                <Text className="text-base text-second-300">
                  Acesse as métricas para acompanhar o progresso de suas
                  plantas.
                </Text>
              </View>

              <Button
                variant="outline"
                className="rounded-full border-white"
                size="sm"
              >
                <Text className="text-sm font-medium text-second-300">
                  Ver mais
                </Text>
              </Button>
            </View>
            <Image
              className="flex-1 w-[130px] h-[170px]"
              source={require('../../../../assets/images/floreo-item.png')}
              style={{ width: 130 }}
              // className="size-[60px] rounded-full border-second-600 border-2"
            />
          </CardContent>
        </Card>

        <Text className="text-lg font-medium text-brand-800 text-left w-full">
          Veja os seus Flóreos
        </Text>

        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <FloreoCard />}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ gap: 12 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text className="text-lg font-medium text-brand-800 text-left w-full">
          Olhe só como estão suas plantas
        </Text>

        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            className="bg-second-200 w-full border border-brand-900"
            key={index}
          >
            <CardHeader className="flex-row items-center gap-4">
              <Image
                source={require('../../../../assets/images/plant-base-image.png')}
                className="size-[60px] rounded-lg"
              />
              <View>
                <Text className="text-xl font-medium text-brand-800 text-left w-full">
                  Natasha
                </Text>
                <Text className="text-sm font-medium text-brand-800 text-left w-full">
                  Nephrolepis exaltata
                </Text>
                <Text className="text-sm font-medium text-brand-800 text-left w-full">
                  Data do plantio: 30/03/2025
                </Text>
              </View>
            </CardHeader>

            <CardContent className="gap-4">
              <Separator className="opacity-50 " />

              <View className="flex-row items-center justify-between gap-4">
                <Text className="text-base font-medium text-brand-800">
                  A umidade está no padrão.
                </Text>
                <View className="size-4 bg-blue-500 rounded-full" />
              </View>

              <View className="flex-row items-center justify-between gap-4">
                <Text className="text-base font-medium text-brand-800">
                  A luminosidade está em 30% (muito abaixo ⚠)
                </Text>
                <View className="size-4 bg-yellow-500 rounded-full" />
              </View>

              <Button
                variant="outline"
                className="rounded-full border-brand-900"
                size="sm"
              >
                <Text className="text-sm font-medium text-brand-800">
                  Ver mais detalhes
                </Text>
              </Button>
            </CardContent>
          </Card>
        ))}
      </View>
    </ScrollView>
  )
}
