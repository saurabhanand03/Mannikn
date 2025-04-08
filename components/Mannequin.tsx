import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

interface ModelProps {
  url: string;
  color?: string;
  scale?: number;
  position?: [number, number, number];
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

export function Model({
  url,
  color = "#ffffff",
  scale = 1,
  position = [0, 0, 0],
  onLoadStart,
  onLoadEnd
}: ModelProps) {
  const { scene } = useGLTF(url, true);

  useEffect(() => {
    onLoadStart?.();

    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material && material.color) {
          material.color.set(color);
        }
      }
    });

    onLoadEnd?.();
  }, [scene, color]);

  return <primitive object={scene} scale={scale} position={position} />;
}

export function ManMannequin({
  gender = "male",
  color,
  onLoadStart,
  onLoadEnd,
}: {
  gender?: "male" | "female";
  color?: string;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}) {
  const url =
    gender === "female"
      ? "https://drive.google.com/uc?export=download&id=14pDZtEyXjBdUqFjf0E_NpUs4sFzGEwi3"
      : "https://drive.google.com/uc?export=download&id=1yJ2mCO8MnLVcDna6ubatdkdfUEtxAUPE"; // Your current male GLB

  return (
    <Model
      url={url}
      color={color}
      scale={1}
      position={[0, -1, 0]}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
    />
  );
}


export function TShirt({ color, onLoadStart, onLoadEnd }: { color?: string, onLoadStart?: () => void, onLoadEnd?: () => void }) {
  return (
    <Model
      url="https://drive.google.com/uc?export=download&id=19AxZ3IEWZqReB2uUT2bIj9yyyULVFvSK"
      color={color}
      scale={1}
      position={[0, -1, 0]}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
    />
  );
}

export function Pants({ color, onLoadStart, onLoadEnd }: { color?: string, onLoadStart?: () => void, onLoadEnd?: () => void }) {
  return (
    <Model
      url="https://drive.google.com/uc?export=download&id=1sWiOonCianK04gf4RWKy9sXCLddyxSnv"
      color={color}
      scale={1}
      position={[0, -1.0, 0]}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
    />
  );
}
