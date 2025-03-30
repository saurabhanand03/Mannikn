/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Model } from "../../components/Mannequin";
import { useGLTF } from "@react-three/drei";

// --- Suppress <primitive> warnings ---
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("<primitive>")) {
      return;
    }
    originalConsoleError(...args);
  };
});
afterAll(() => {
  console.error = originalConsoleError;
});

// --- Mock the useGLTF hook ---
jest.mock("@react-three/drei", () => ({
  useGLTF: jest.fn(),
}));

describe("Model component", () => {
  it("applies color to mesh materials in scene traversal", async () => {
    const setSpy = jest.fn();
    const fakeMesh = {
      isMesh: true,
      material: {
        color: { set: setSpy },
      },
    };
    const fakeScene = {
      traverse: (callback: (object: any) => void) => {
        callback(fakeMesh);
      },
    };
    (useGLTF as unknown as jest.Mock).mockReturnValue({ scene: fakeScene });
    render(<Model url="dummy-url" color="#ff0000" />);
    await waitFor(() => {
      expect(setSpy).toHaveBeenCalledWith("#ff0000");
    });
  });
});
