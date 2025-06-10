import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="romantic"
        options={{ tabBarLabel: 'Romantic', tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="secret"
        options={{ tabBarLabel: 'Secret', tabBarIcon: ({ color, size }) => <Ionicons name="lock-closed" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ tabBarLabel: 'Calendar', tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="game"
        options={{ tabBarLabel: 'Game', tabBarIcon: ({ color, size }) => <Ionicons name="game-controller" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ tabBarLabel: 'Settings', tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} /> }}
      />
    </Tabs>
  );
}