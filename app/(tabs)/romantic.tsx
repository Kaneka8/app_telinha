import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RomanticScreen() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Redirect href="/login" />;

  return (
    <View>
      <Text>Bem-vindo ao clima romântico! 💖</Text>
    </View>
  );
}
