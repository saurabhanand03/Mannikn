import React, { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged, User, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseApp } from './firebase';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from './firebase'; // Import your Firebase auth instance




// 2️⃣ Create Auth Context
const AuthContext = createContext<{ user: User | null }>({ user: null });

// 3️⃣ Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 4️⃣ Listen to Auth State Changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        router.push('/'); // Navigate to Home if logged in
      } else {
        router.push('/explore'); // Navigate to Explore/Login if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // 5️⃣ Show Loading Spinner while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 6️⃣ Provide Auth Context to child components
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

// 7️⃣ Custom Hook to Access Auth Context
export function useAuth() {
  return useContext(AuthContext);
}
