import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase'; // ajuste o caminho conforme seu projeto

// 1. Tipagem do contexto
type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// 2. Criação do contexto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// 3. Componente que envolve sua aplicação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe; // limpa o listener no unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook customizado para usar o contexto facilmente
export const useAuth = () => useContext(AuthContext);
