import { ChevronRight, Sprout } from 'lucide-react-native'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { View } from 'react-native'
import { Text } from './ui/Text'
import { Link } from 'expo-router'

export function FloreoCard({ id, numeration, status }: { id: number; numeration: string; status: boolean }) {
  return (
    <Link href={`/(app)/(tabs)/engines/${id}`}>
      <Card className="bg-second-200 w-full border border-brand-900 flex-row">
        <View className="flex-1">
          <CardHeader className="flex-row items-center gap-2 pb-2">
            <Sprout size={24} color="#504120" />
            <CardTitle className="text-second-900">{numeration}</CardTitle>
          </CardHeader>
          <CardContent className="flex-row items-center gap-2">
            {status ? (
              <>
                <View className="size-2 rounded-full bg-green-500" />
                <Text className="text-base font-medium text-second-700">
                  Ativo
                </Text>
              </>
            ) : (
              <>
                <View className="size-2 rounded-full bg-danger-500" />
                <Text className="text-base font-medium text-second-700">
                  Desativado
                </Text>
              </>
            )}
            
          </CardContent>
        </View>
        <View className="fitems-end justify-center pr-4">
          <ChevronRight size={24} color="#504120" />
        </View>
      </Card>
    </Link>
  )
}
