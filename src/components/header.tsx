import { useEffect, useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import Contants from 'expo-constants'
import { Text } from './ui/Text'
import { Bell } from 'lucide-react-native'
import { useAuth } from '@/contexts/auth-context'
import { getInitials } from '@/lib/utils'
import { Skeleton } from './ui/Skeleton'
import { supabase } from '@/lib/supabase'

const statusBarHeight = Contants.statusBarHeight

export function getGreetingWithEmoji(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Bom dia ☀️'
  if (hour >= 12 && hour < 18) return 'Boa tarde 🌤️'
  return 'Boa noite 🌑'
}

type UserInfo = {
  name: string | null
  avatarUrl: string | null
}

export function Header() {
  const { user } = useAuth()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserInfo() {
      if (!user?.id) return
      setLoading(true)

      const { data, error } = await supabase
        .from('users')
        .select('name, avatarUrl')
        .eq('id', user.id)
        .single()

      if (data) setUserInfo(data)
      setLoading(false)
    }

    loadUserInfo()
  }, [user])

  const initials = getInitials(userInfo?.name || '')
  console.log(userInfo)

  return (
    <View className="px-8 bg-second-50" style={{ paddingTop: statusBarHeight }}>
      <View className="pb-3 border-b border-b-second-600 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="w-12 h-12 rounded-full border border-second-600 overflow-hidden items-center justify-center bg-white">
            {loading ? (
              <Skeleton className="size-12 rounded-full" />
            ) : userInfo?.avatarUrl ? (
              <Image
                source={{ uri: userInfo.avatarUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-brand-900 text-lg font-bold">{initials}</Text>
            )}
          </View>

          <View>
            <Text className="font-medium text-2xl text-brand-900 m-0">
              {getGreetingWithEmoji()}
            </Text>
            {loading ? (
              <Skeleton className="mt-1 w-[120px] h-[18px]" />
            ) : (
              <Text className="text-lg text-brand-900 leading-none">
                {userInfo?.name || 'Usuário'}
              </Text>
            )}
          </View>
        </View>

        <Pressable className="w-10 h-10 items-center justify-center rounded-full bg-tertiary-100">
          <Bell size={20} color={'#3C683A'} />
        </Pressable>
      </View>
    </View>
  )
}
