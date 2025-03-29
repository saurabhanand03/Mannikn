import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ManMannequin, TShirt, Pants } from "@/components/Mannequin";
import { THREE } from "expo-three";
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function HomeScreen() {
    const [topColor, setTopColor] = useState('#00c0b0');
    const [bottomColor, setBottomColor] = useState('#00c0b0');

    useEffect(() => {
        const fetchSelectedOutfit = async () => {
          const user = getAuth().currentUser;
          if (!user) return;
    
          const userRef = doc(db, 'users', user.uid);
          const snapshot = await getDoc(userRef);
    
          if (snapshot.exists()) {
            const outfit = snapshot.data().selectedOutfit;
            if (outfit?.top?.color) setTopColor(outfit.top.color);
            if (outfit?.bottom?.color) setBottomColor(outfit.bottom.color);
          }
        };
    
        fetchSelectedOutfit();
      }, []);

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
            <TShirt color={topColor} />
            <Pants color={bottomColor} />
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
