import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export function CesiumMan() {
  const { scene } = useGLTF(
    "https://drive.google.com/uc?export=download&id=1yJ2mCO8MnLVcDna6ubatdkdfUEtxAUPE",
    undefined
  );

  if (!scene) return null; // Prevents undefined errors

  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
}

export function WhiteT() {
  const { materials, scene } = useGLTF(
    "https://drive.google.com/uc?export=download&id=1NjRs_RRnQYq0eZgERjBwEXvtWA5xvOhm",
    undefined
  );

  if (!scene) return null;

  useEffect(() => {
    if (!scene) return;
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material && material.color) {
          material.color.set("#00c0b0");
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1} position={[0, -1.2, 0.05]} />;
}

export function Pants() {
  const { scene, materials } = useGLTF(
    "https://drive.google.com/uc?export=download&id=1848VEOTDguvbLd03hH7HBw_i6Jfdoc0M",
    undefined
  );

  if (!scene) return null;

  useEffect(() => {
    if (!scene) return;

    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material && material.color) {
          material.color.set("#00c0b0");
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1} position={[0, -1.17, 0.06]} />;
}
