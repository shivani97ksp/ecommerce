import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";

describe("Login Component", () => {
  it("should render login form with username and password fields", () => {
    const { getByPlaceholderText } = render(<Login />);

    expect(getByPlaceholderText("username")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should show error message when submitting form with empty fields", async () => {
    const { getByText } = render(<Login />);
    fireEvent.click(getByText("LOGIN"));

    await waitFor(() => {
      expect(getByText("Please Enter Username")).toBeInTheDocument();
      expect(getByText("Please Enter Password")).toBeInTheDocument();
    });
  });

  it("should show error message when username or password is incorrect", async () => {
    // Mocking fetch API
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.change(getByPlaceholderText("username"), {
      target: { value: "invalidUsername" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "invalidPassword" },
    });
    fireEvent.click(getByText("LOGIN"));

    await waitFor(() => {
      expect(getByText("Please Enter valid username")).toBeInTheDocument();
    });
  });

  it("should successfully login when valid username and password are provided", async () => {
    // Mocking fetch API
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ password: "validPassword" }),
    });

    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.change(getByPlaceholderText("username"), {
      target: { value: "validUsername" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "validPassword" },
    });
    fireEvent.click(getByText("LOGIN"));

    await waitFor(() => {
      expect(sessionStorage.getItem("username")).toBe("validUsername");
    });
  });
});
