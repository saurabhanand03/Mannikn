// components/LoadingSpinner.tsx
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export function LoadingSpinner() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#00c0b0" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
});
