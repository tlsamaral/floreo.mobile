import { Tabs } from 'expo-router'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 60,
          backgroundColor: '#1b381b',
          borderRadius: 40,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarItemStyle: {
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#fff' : 'transparent',
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Ionicons
                name="home-outline"
                size={22}
                color={focused ? '#1b381b' : '#fff'}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}
