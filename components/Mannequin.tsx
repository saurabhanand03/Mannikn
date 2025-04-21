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
  onLoadEnd,
}: ModelProps) {
  console.log("Model URL:", url);

  const { scene } = useGLTF(url, true);

  useEffect(() => {
    if (!scene) {
      console.error("Scene is undefined for URL:", url);
      return;
    }

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

  return scene ? (
    <primitive object={scene} scale={scale} position={position} />
  ) : null;
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
      ? "https://drive.google.com/uc?export=download&id=1HbE7DI2Jj1LjUrjeVNCZM9ULmpglHCAg"
      : "https://drive.google.com/uc?export=download&id=1pVhtzQ3hCMTHBp2aJ6nE3RMhSNbr0Krg"; // Your current male GLB

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
      url="https://drive.google.com/uc?export=download&id=1-J7qjJlCkFd5SaFefpDxjKQebLUckYUk"
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
      url="https://drive.google.com/uc?export=download&id=1H_dI9D9M5inrSb0Ki1b6Iny5nOV8tGCj"
      color={color}
      scale={1}
      position={[0, -1.0, 0]}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
    />
  );
}
