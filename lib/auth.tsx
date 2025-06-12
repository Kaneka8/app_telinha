import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebaseConfig';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);

// app/auth.tsx
import { View, Text } from 'react-native';

export default function AuthScreen() {
  return (
    <View>
      <Text>Página de Autenticação</Text>
    </View>
  );
}


// Agora usa persistence:
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

