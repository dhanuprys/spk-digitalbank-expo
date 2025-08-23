import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Feather from '@expo/vector-icons/Feather';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerIcon: ({ color }) => 
              <Feather name="home" size={24} color={color} />,
            drawerLabel: 'Home',
            title: 'SPK Simkatmawa'
          }} />
          <Drawer.Screen
            name="about"
            options={{
              drawerIcon: ({ color }) =>
                  <Feather name="info" size={24} color={color} />,
              drawerLabel: 'Tentang Kami',
              title: 'Tentang Kami'
            }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
