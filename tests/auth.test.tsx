// __tests__/signup.test.ts
import { signUpWithEmail } from "../utils/signup"; // Adjust path
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock("@/firebase", () => ({
  auth: {},
  db: {},
}));

describe("signUpWithEmail", () => {
  it("throws an error if email or password is missing", async () => {
    await expect(signUpWithEmail("", "password123")).rejects.toThrow("Missing email or password");
  });

  it("creates a user and sets doc in Firestore", async () => {
    const mockUser = { uid: "abc123", email: "test@example.com" };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: mockUser });

    const result = await signUpWithEmail("test@example.com", "password123");

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, "test@example.com", "password123");
    expect(setDoc).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });
});
