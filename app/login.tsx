import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "@/firebase";
import { useAuth } from "@/auth-provider";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both valid email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const loggedInUser = userCredential.user;
        Alert.alert("Success", `Welcome back, ${loggedInUser.email}!`);
        router.push("/"); 
      })
      .catch((error) => {
        Alert.alert("Login Error", error.message);
      });
  };

  const navigateToSignUp = () => {
    router.push("/signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#007BFF",
  },
});
