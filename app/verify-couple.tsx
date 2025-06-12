// app/verify-couple.tsx
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../firebase';

export default function VerifyCoupleScreen() {
  const router = useRouter();
  const [coupleId, setCoupleId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!coupleId.trim()) {
      Alert.alert('Erro', 'Por favor, insira um código.');
      return;
    }

    setLoading(true);

    try {
      const db = getDatabase();
      const coupleRef = ref(db, `couples/${coupleId}`);
      const snapshot = await get(coupleRef);

      if (snapshot.exists()) {
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error('Usuário não autenticado.');

        // Atualiza o perfil com o coupleId
        const userRef = ref(db, `users/${userId}`);
        await getDatabase().ref(userRef).update({ coupleId });

        Alert.alert('Verificado!', 'Casal encontrado com sucesso!');
        router.replace('./tabs/profile');
      } else {
        Alert.alert('Código inválido', 'Nenhum casal encontrado com esse código.');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar Casal</Text>
      <TextInput
        style={styles.input}
        placeholder="Código do casal"
        value={coupleId}
        onChangeText={setCoupleId}
        autoCapitalize="none"
      />
      <Button title={loading ? 'Verificando...' : 'Verificar'} onPress={handleVerify} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
});
