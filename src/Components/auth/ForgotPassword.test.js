import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

describe("ForgotPassword Component", () => {
  it("should render forgot password form with email, new password, and confirm password fields", () => {
    const { getByPlaceholderText } = render(<ForgotPassword />);

    expect(getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter New Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  it("should show error message when submitting form with passwords that do not match", async () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    fireEvent.change(getByPlaceholderText("Enter New Password"), {
      target: { value: "newPassword" },
    });
    fireEvent.change(getByPlaceholderText("Confirm Password"), {
      target: { value: "differentPassword" },
    });
    fireEvent.click(getByText("Update Password"));

    await waitFor(() => {
      expect(getByText("Passwords do not match")).toBeInTheDocument();
    });
  });

  it("should show error message when API call fails", async () => {
    // Mocking fetch API
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    fireEvent.change(getByPlaceholderText("Enter Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Enter New Password"), {
      target: { value: "newPassword" },
    });
    fireEvent.change(getByPlaceholderText("Confirm Password"), {
      target: { value: "newPassword" },
    });
    fireEvent.click(getByText("Update Password"));

    await waitFor(() => {
      expect(
        getByText("Failed to update password. Please try again.")
      ).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
