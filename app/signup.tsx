import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { auth, db } from "@/firebase";
import { useAuth } from "@/auth-provider";
import { signUpWithEmail } from "@/utils/signup";

export default function SignUpScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If a user is already logged in, redirect to the home/profile page
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  async function handleSignUp() {
    try {
      const newUser = await signUpWithEmail(email, password);
      Alert.alert("Success", `Welcome ${newUser.email}!`);
      router.push("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      // Optionally, set a contrasting background on the container
      backgroundColor: "white",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "black", // so the title shows up on the black background
    },
    input: {
      borderWidth: 1,
      borderColor: "black", // optional: adds a white border around the input
      backgroundColor: "white", // white text box
      color: "black", // white text inside the input
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
  });
  