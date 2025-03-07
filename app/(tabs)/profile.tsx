import { useEffect } from "react";
import { StyleSheet, Image, View, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/auth-provider";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../../firebase";

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();

  // If no user is logged in, show a sign in prompt
  if (!user) {
    return (
      <View style={styles.container}>
        <ThemedText type="title" style={styles.name}>
          Please Sign In
        </ThemedText>
        <Button title="Sign In" onPress={() => router.push("/login")} />
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
        <Image
          source={require("@/assets/images/profile.png")}
          style={styles.profileImage}
        />
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
      </ThemedView>

      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#ffffff",
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
});
