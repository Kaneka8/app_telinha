import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      setUserCreated(true);
      Toast.show({
        type: 'success',
        text1: 'Conta criada',
        text2: 'Verifique seu e-mail antes de fazer login',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      Toast.show({
        type: 'info',
        text1: 'Verificação reenviada',
        text2: 'Cheque sua caixa de entrada.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button
          title={userCreated ? 'Conta Criada!' : 'Cadastrar'}
          onPress={handleSignup}
          disabled={userCreated}
        />
      )}

      {userCreated && (
        <TouchableOpacity onPress={resendVerification}>
          <Text style={styles.link}>Reenviar e-mail de verificação</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.link} onPress={() => router.replace('/login')}>
        Voltar para login
      </Text>
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
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: 'blue',
  },
});
