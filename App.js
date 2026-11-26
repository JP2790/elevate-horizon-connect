import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './Screens/HomeScreen';
import EventsScreen from './Screens/EventsScreen';
import EventDetailsScreen from './Screens/EventDetailsScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SettingsScreen from './Screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#2374AB' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{ minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}
            accessibilityLabel="Open Settings"
          >
            <Ionicons name="settings-sharp" size={24} color="#1E293B" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#2374AB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: { height: 65, paddingBottom: 8, paddingTop: 8 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = route.name === 'Home'
            ? (focused ? 'home' : 'home-outline')
            : (focused ? 'calendar' : 'calendar-outline');
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Elevate Horizon Connect', tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{ title: 'Events', tabBarLabel: 'Events' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#2374AB' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{ title: 'Event Details' }}
          />
          <Stack.Screen
            name="RegisterEvent"
            component={RegisterScreen}
            options={{ title: 'Register' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>``
    </PaperProvider>
  );
}