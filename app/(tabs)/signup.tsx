import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth, db } from '../../firebase';  // Adjust path as needed
import { useAuth } from '../../auth-provider'; // Import useAuth
import { doc, setDoc } from 'firebase/firestore';
import { create } from 'react-test-renderer';


export default function SignUpScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignUp() {
        if(!email || !password) {
            Alert.alert('Error', 'Please enter both a valid email and password.');
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Create a new document in the "users" collection with the user's email
            await setDoc(doc(db, 'users', user.uid), { 
                uid: user.uid,
                email: user.email,
                createdAt: new Date() 
            });
            Alert.alert('Success', `Welcome ${user.email}!`);
            console.log("Logged-in User:", email); // Log the user to verify context
            router.push('/'); // Navigate to home after signup
        }catch(error: any){
            Alert.alert('Error', error.message);

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
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
});
