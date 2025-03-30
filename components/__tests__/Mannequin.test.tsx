import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { useGLTF } from "@react-three/drei";
import { Model, ManMannequin, TShirt, Pants } from "../Mannequin"; 
// Adjust path as needed

// Mock the useGLTF hook
jest.mock("@react-three/drei", () => ({
  useGLTF: jest.fn(),
}));

describe("Model component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders null if scene is undefined", () => {
    (useGLTF as unknown as jest.Mock).mockReturnValue({ scene: undefined });
    const { container } = render(<Model url="dummy-url" />);
    expect(container.firstChild).toBeNull();
  });

  it("applies color to mesh materials in scene traversal", () => {
    const setSpy = jest.fn();
    const fakeMesh = {
      isMesh: true,
      material: {
        color: { set: setSpy },
      },
    };
    const fakeScene = {
      traverse: (callback: (object: any) => void) => callback(fakeMesh),
    };
    (useGLTF as unknown as jest.Mock).mockReturnValue({ scene: fakeScene });
    render(<Model url="dummy-url" color="#ff0000" />);
    expect(setSpy).toHaveBeenCalledWith("#ff0000");
  });

  it("renders a primitive with the correct scale and position", () => {
    const fakeScene = { traverse: jest.fn() };
    (useGLTF as unknown as jest.Mock).mockReturnValue({ scene: fakeScene });
    const component = renderer.create(
      <Model url="dummy-url" color="#00ff00" scale={2} position={[1, 2, 3]} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe("Wrapper components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fakeScene = { traverse: jest.fn() };
  (useGLTF as unknown as jest.Mock).mockReturnValue({ scene: fakeScene });

  it("ManMannequin uses the correct URL", () => {
    render(<ManMannequin color="#abcdef" />);
    expect(useGLTF).toHaveBeenCalledWith(
      "https://drive.google.com/uc?export=download&id=1yJ2mCO8MnLVcDna6ubatdkdfUEtxAUPE"
    );
  });

  it("TShirt uses the correct URL", () => {
    render(<TShirt color="#abcdef" />);
    expect(useGLTF).toHaveBeenCalledWith(
      "https://drive.google.com/uc?export=download&id=19AxZ3IEWZqReB2uUT2bIj9yyyULVFvSK"
    );
  });

  it("Pants uses the correct URL", () => {
    render(<Pants color="#abcdef" />);
    expect(useGLTF).toHaveBeenCalledWith(
      "https://drive.google.com/uc?export=download&id=1sWiOonCianK04gf4RWKy9sXCLddyxSnv"
    );
  });
});
