// screens/ai-positions.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const AiPositions = () => {
  const [posicoes, setPosicoes] = useState([]);
  const [posicaoAtual, setPosicaoAtual] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const carregarPosicoes = async () => {
    const snapshot = await getDocs(collection(db, "posicoes"));
    const lista = snapshot.docs.map(doc => doc.data());
    setPosicoes(lista);
    sortear(lista);
    setLoading(false);
  };

  const sortear = (lista = posicoes) => {
    if (lista.length > 0) {
      const aleatoria = lista[Math.floor(Math.random() * lista.length)];
      setPosicaoAtual(aleatoria);
    }
  };

  useEffect(() => {
    carregarPosicoes();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="red" />;

  return (
    <View style={{ padding: 20 }}>
      {posicaoAtual && (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{posicaoAtual.titulo}</Text>
          <Image
            source={{ uri: posicaoAtual.imagem_url }}
            style={{ width: "100%", height: 250, marginVertical: 16, borderRadius: 10 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 16 }}>{posicaoAtual.descricao}</Text>
        </>
      )}
      <Button title="Mostrar outra" onPress={sortear} />
    </View>
  );
};

export default AiPositions;
