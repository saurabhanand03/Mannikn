import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

interface ModelProps {
  url: string;
  color?: string;
  scale?: number;
  position?: [number, number, number];
}

export function Model({
  url,
  color = "#ffffff",
  scale = 1,
  position = [0, 0, 0],
}: ModelProps) {
  const { scene } = useGLTF(url);

  if (!scene) return null;

  useEffect(() => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material && material.color) {
          material.color.set(color);
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} scale={scale} position={position} />;
}

export function ManMannequin({ color }: { color?: string }) {
  return (
    <Model
      url="https://drive.google.com/uc?export=download&id=1yJ2mCO8MnLVcDna6ubatdkdfUEtxAUPE"
      color={color}
      scale={1}
      position={[0, -1, 0]}
    />
  );
}

export function TShirt({ color }: { color?: string }) {
  return (
    <Model
      url="https://drive.google.com/uc?export=download&id=1NjRs_RRnQYq0eZgERjBwEXvtWA5xvOhm"
      color={color}
      scale={1}
      position={[0, -1.2, 0.05]}
    />
  );
}

export function Pants({ color }: { color?: string }) {
  return (
    <Model
      url="https://drive.google.com/uc?export=download&id=1848VEOTDguvbLd03hH7HBw_i6Jfdoc0M"
      color={color}
      scale={1}
      position={[0, -1.17, 0.06]}
    />
  );
}
