import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ManMannequin, TShirt, Pants } from "@/components/Mannequin";
import { THREE } from "expo-three";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [0, 1, 3], fov: 75 }}
        gl={{ debug: { checkShaderErrors: false, onShaderError: null } }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 4, 5]} intensity={1} />
        <FollowCameraLight />
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

function FollowCameraLight() {
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return <directionalLight ref={lightRef} intensity={3} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
