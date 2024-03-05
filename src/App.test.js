import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  it("should render Navbar component", () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByText("Navbar")).toBeInTheDocument();
  });

  it("should render Home component by default", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("should navigate to Login component when clicking on login link", async () => {
    const { getByText, history } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    fireEvent.click(getByText("Login"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/login");
    });
  });

  it("should navigate to Register component when clicking on register link", async () => {
    const { getByText, history } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    fireEvent.click(getByText("Register"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/register");
    });
  });

  it("should navigate to Forgot Password component when clicking on forgot password link", async () => {
    const { getByText, history } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    fireEvent.click(getByText("Forgot Password"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/forgot-password");
    });
  });
});
