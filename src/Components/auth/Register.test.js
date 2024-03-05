import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

describe("Register Component", () => {
  it("should render registration form with username, password, email, phone, country, address, and gender fields", () => {
    const { getByPlaceholderText, getByLabelText } = render(<Register />);

    expect(getByPlaceholderText("Enter Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Phone Number")).toBeInTheDocument();
    expect(getByLabelText("Country")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Address")).toBeInTheDocument();
    expect(getByLabelText("Male")).toBeInTheDocument();
    expect(getByLabelText("Female")).toBeInTheDocument();
  });

  it("should show error message when submitting form with empty fields", async () => {
    const { getByText } = render(<Register />);
    fireEvent.click(getByText("Register"));

    await waitFor(() => {
      expect(getByText("Please enter the value in id")).toBeInTheDocument();
      expect(
        getByText("Please enter the value in Password")
      ).toBeInTheDocument();
      expect(getByText("Please enter the value in Email")).toBeInTheDocument();
    });
  });

  it("should successfully register when all fields are filled correctly", async () => {
    // Mocking fetch API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(getByPlaceholderText("Enter Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText("Enter Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.change(getByPlaceholderText("Enter Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(getByText("Register"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: "testuser",
          password: "testpassword",
          email: "test@example.com",
          phone: "",
          country: "india",
          address: "",
          gender: "female",
        }),
      });
    });
  });
});
