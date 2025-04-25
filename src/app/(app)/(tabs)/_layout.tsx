// app/(tabs)/_layout.tsx
import { Tabs, usePathname } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { ChartPie, Component, House, Leaf, User } from 'lucide-react-native'

export default function TabsLayout() {
  const pathname = usePathname()
  const isProfilePage =
    pathname?.startsWith('/profile') && pathname !== '/profile'
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarStyle: isProfilePage ? { display: 'none' } : styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#2F512D',
        tabBarInactiveTintColor: '#F8FAEC',
        tabBarItemStyle: {
          borderRadius: 50,
          width: '90%',
          marginHorizontal: 'auto',
          paddingHorizontal: 20,
          // paddingVertical: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <House size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="engines"
        options={{
          title: 'Motores',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Component size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: 'Plantas',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Leaf size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Análises',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <ChartPie size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <User size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'fixed',
    width: '90%',
    height: 60,
    paddingHorizontal: 20,
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 32,
    paddingTop: 10,
    backgroundColor: '#243E22',
    borderRadius: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
  },
  iconContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 44,
  },
  activeIcon: {
    backgroundColor: '#FDFDF9',
    width: 76,
  },
})
