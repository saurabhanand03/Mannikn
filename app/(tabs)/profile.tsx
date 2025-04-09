import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/auth-provider";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";


export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [skinTone, setSkinTone] = useState("");

  const skinTones = [
    { label: "Light", color: "#f3d7b6" },
    { label: "Tan", color: "#e0ac69" },
    { label: "Brown", color: "#c68642" },
    { label: "Dark", color: "#8d5524" },
  ];


  useEffect(() => {
    const fetchGender = async () => {
      const user = getAuth().currentUser;
      if (!user) return;
  
      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        setGender(snapshot.data().gender || "");
        setSkinTone(snapshot.data().skinTone || "");
      }
    };
  
    fetchGender();
  }, []);

  // If no user is logged in, show a nicer sign in prompt without a background image
  if (!user) {
    return (
      <View style={styles.signInContainer}>
        <View style={styles.overlay}>
          <ThemedText type="title" style={styles.signInTitle}>
            Welcome Back!
          </ThemedText>
          <ThemedText style={styles.signInSubtitle}>
            Please sign in to access your profile and get started.
          </ThemedText>
          <Button
            title="Sign In"
            onPress={() => router.push("/login")}
            color="#fff"
          />
        </View>
      </View>
    );
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/signup");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <View style={styles.headerPlaceholder}>
          <ThemedText type="title" style={styles.name}>
            {user.displayName || user.email}
          </ThemedText>
        </View>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.name}>
          {user.displayName || user.email}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.bio}>
          Welcome back! Here's your profile information.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.detailsSection}>
        {/* Email */}
        <View style={styles.detailItem}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Email
          </ThemedText>
          <ThemedText style={styles.detailValue}>{user.email}</ThemedText>
        </View>
        <View style={styles.divider} />

        {/* Phone */}
        <View style={styles.detailItem}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Phone
          </ThemedText>
          <ThemedText style={styles.detailValue}>
            {user.phoneNumber || "N/A"}
          </ThemedText>
        </View>
        <View style={styles.divider} />

        {/* Location */}
        <View style={styles.detailItem}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Location
          </ThemedText>
          <ThemedText style={styles.detailValue}>N/A</ThemedText>
        </View>
        <View style={styles.divider} />

        {}
        <View style={styles.detailItem}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Gender
          </ThemedText>
          <Picker
            selectedValue={gender}
            style={styles.picker} // same styling as in ClothingScreen
            dropdownIconColor="#666"
            onValueChange={async (value) => {
              setGender(value);
              const currentUser = getAuth().currentUser;
              if (!currentUser) return;
              const userRef = doc(db, "users", currentUser.uid);
              await updateDoc(userRef, { gender: value });
            }}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <View style={styles.divider} />
        {}

        <View style={styles.detailItem}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Skin Tone
          </ThemedText>
          <View style={styles.skinToneOptions}>
            {skinTones.map(({ color }) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.skinCircle,
                  { backgroundColor: color },
                  skinTone === color && styles.skinCircleSelected,
                ]}
                onPress={async () => {
                  setSkinTone(color);
                  const user = getAuth().currentUser;
                  if (!user) return;
                  const userRef = doc(db, "users", user.uid);
                  await updateDoc(userRef, { skinTone: color });
                }}
              />
            ))}
          </View>
        </View>
        <View style={styles.divider} />




      </ThemedView>

      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerPlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
  },
  container: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  name: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  bio: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  detailsSection: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: "#555",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  signInContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0", // a gentle background color
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "#333", // dark overlay card for contrast
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  signInTitle: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  signInSubtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
nativePickerWrapper: {
  flex: 1,
  alignItems: "flex-end",
  justifyContent: "center",
},
picker: {
  height: 50,
  width: 150, 
},

nativePicker: {
  width: 150,
  color: "#333",
  fontWeight: "bold",
  textAlign: "right", 
  paddingRight: 10,   
  backgroundColor: "transparent",
},

skinCircle: {
  width: 40,
  height: 40,
  borderRadius: 20,
  margin: 5,
  borderWidth: 2,
  borderColor: "transparent",
},
skinCircleSelected: {
  borderColor: "#007AFF",
},
skinToneOptions: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  flex: 1,
},

  
  
  
});
