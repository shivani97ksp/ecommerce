import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home Component", () => {
  it("should redirect to login if username is not set in session storage", () => {
    sessionStorage.clear(); // Clear sessionStorage before test

    const mockNavigate = jest.fn(); // Mock useNavigate function
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should not redirect if username is set in session storage", () => {
    sessionStorage.setItem("username", "testUser");

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
