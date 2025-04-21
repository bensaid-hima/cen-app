import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import TodayScreen from '../screens/TodayScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import SavedScreen from '../screens/SavedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ArticleDetailScreen from '../screens/ArticleDetailScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'
          if (route.name === 'Today') iconName = 'home'
          else if (route.name === 'Discover') iconName = 'search'
          else if (route.name === 'Saved') iconName = 'bookmark'
          else if (route.name === 'Profile') iconName = 'person'
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#B40000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetailScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
