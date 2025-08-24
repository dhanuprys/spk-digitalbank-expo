import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import '../global.css';

export default function Layout() {
  useEffect(() => {
    // Ignore specific warnings that might cause crashes
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
      'AsyncStorage has been extracted from react-native core',
      'ViewPropTypes will be removed from React Native',
    ]);
  }, []);

  return <Slot />;
}
