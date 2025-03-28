import React from "react";
import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ManMannequin, TShirt, Pants } from "@/components/Mannequin";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [0, 1, 3], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 4, 5]} intensity={2} />
        <group scale={[1.5, 1.5, 1.5]}>
          <TShirt color="#00c0b0" />
          <Pants color="#00c0b0" />
          <ManMannequin color="#ffffff" />
        </group>
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={10}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
