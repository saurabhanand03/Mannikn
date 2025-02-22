import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useAuth } from '../../auth-provider'; // Import useAuth

export default function ExploreScreen() {
  const { user } = useAuth(); // Access the user context

  console.log("Logged-in User:", user); // Log the user to verify context

  return (
    <ScrollView style={styles.container}>
      {/* Header Placeholder */}
      <View style={styles.headerPlaceholder} />

      {/* Title */}
      <Text style={styles.title}>Explore Fashion</Text>
      <Text style={styles.subtitle}>Find new trends and outfit ideas.</Text>

      {/* Show logged-in user's email */}
      {user ? (
        <Text style={styles.loggedInText}>Welcome, {user.email}!</Text>
      ) : (
        <Text style={styles.loggedInText}>Not logged in</Text>
      )}

      {/* Trending Styles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Trending Styles</Text>
        <Text style={styles.sectionText}>Check out the latest fashion trends.</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Outfit Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Outfit Recommendations</Text>
        <Text style={styles.sectionText}>
          Get outfit ideas tailored to your style.
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* AI-Generated Looks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🤖 AI-Generated Looks</Text>
        <Text style={styles.sectionText}>
          Use AI to see how different outfits look on your virtual mannequin.
        </Text>
        <View style={styles.placeholder} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  headerPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  loggedInText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#007AFF", // Blue color for user info
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  placeholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
  },
});
