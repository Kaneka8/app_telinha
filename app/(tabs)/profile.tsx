import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useRouter } from 'expo-router';

export default function Profile() {
  const [names, setNames] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    const db = getDatabase();
    const couplesRef = ref(db, 'couples');

    const unsubscribe = onValue(couplesRef, (snapshot) => {
      let found = false;

      snapshot.forEach((childSnapshot) => {
        const couple = childSnapshot.val();
        if (couple.user === user.uid) {
          setNames(couple.names);
          found = true;
        }
      });

      if (!found) {
        setNames('Casal não encontrado');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Casal</Text>
      <Text style={styles.info}>Nomes: {names}</Text>

      <Button title="Editar perfil" onPress={() => router.push('/edit-couple')} />

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => router.push('/calendar')}>
          <Text style={styles.menuItem}>📅 Encontros</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/romantic')}>
          <Text style={styles.menuItem}>💖 Romântico</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-positions')}>
          <Text style={styles.menuItem}>🛌 Posições</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/game')}>
          <Text style={styles.menuItem}>🎮 Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  menu: {
    marginTop: 40,
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 8,
    color: 'blue',
  },
});

