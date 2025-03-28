import React from "react";
import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CesiumMan, WhiteT, Pants } from "@/components/Mannequin";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [0, 1, 3], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 4, 5]} intensity={2} />
        <WhiteT />
        <Pants />
        <CesiumMan />
        <OrbitControls
          minPolarAngle={0.5}
          maxPolarAngle={1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableZoom={false}
          enablePan={false}
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
