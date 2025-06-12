import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function EditCouple() {
  const [names, setNames] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateCouple = async () => {
    if (!names) return Alert.alert('Erro', 'Digite o nome do casal.');

    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const db = getDatabase();
      const newCoupleRef = push(ref(db, 'couples'));

      await set(newCoupleRef, {
        names,
        user: user.uid,
      });

      Alert.alert('Sucesso', 'Casal criado com sucesso!');
      setNames('');
    } catch (error: any) {
      Alert.alert('Erro ao criar casal', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Casal</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: João e Maria"
        value={names}
        onChangeText={setNames}
      />
      <Button title={loading ? 'Salvando...' : 'Criar Casal'} onPress={handleCreateCouple} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
});
