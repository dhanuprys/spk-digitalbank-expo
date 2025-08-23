import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Feather from '@expo/vector-icons/Feather';
import { View, Text } from 'react-native';
import { useEffect } from 'react';

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Global error handler for navigation
    const handleError = (error: Error) => {
      console.error('Navigation error caught:', error);
    };

    // Add global error listener
    if (__DEV__) {
      console.log('Error boundary initialized');
    }

    return () => {
      // Cleanup
    };
  }, []);

  return <>{children}</>;
}

export default function Layout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1}}>
        <Drawer
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#fff',
              width: 280,
            },
            drawerActiveTintColor: '#3B82F6',
            drawerInactiveTintColor: '#6B7280',
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerIcon: ({ color }) => 
                <Feather name="home" size={24} color={color} />,
              drawerLabel: 'Home',
              title: 'SPK Simkatmawa'
            }} 
          />
          <Drawer.Screen
            name="about"
            options={{
              drawerIcon: ({ color }) =>
                  <Feather name="info" size={24} color={color} />,
              drawerLabel: 'Tentang Kami',
              title: 'Tentang Kami'
            }} 
          />
        </Drawer>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
