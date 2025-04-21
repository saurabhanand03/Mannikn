// __tests__/AnalyzeScreen.simple.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AnalyzeScreen from "../app/(tabs)/analyze"; // Adjust the import path as needed
import { httpsCallable } from "firebase/functions";

// Mock out Firebase
jest.mock("firebase/functions", () => ({
  httpsCallable: jest.fn(),
}));
jest.mock("../../firebase", () => ({
  functions: {},
}));

test("sends user message and displays AI response", async () => {
  // Mock httpsCallable to return a function that resolves with { data.reply }
  const mockFn = jest.fn().mockResolvedValue({ data: { reply: "Mocked AI reply" } });
  (httpsCallable as jest.Mock).mockReturnValue(mockFn);

  const { getByPlaceholderText, getByText, findByText } = render(<AnalyzeScreen />);

  // Type and send
  fireEvent.changeText(getByPlaceholderText("Ask your stylist..."), "Hello?");
  fireEvent.press(getByText("Send"));

  // User bubble appears immediately
  expect(getByText("Hello?")).toBeTruthy();

  // Then the AI bubble appears
  expect(await findByText("Mocked AI reply")).toBeTruthy();

  // And our callable was invoked correctly
  expect(mockFn).toHaveBeenCalledWith({ prompt: "Hello?" });
});
