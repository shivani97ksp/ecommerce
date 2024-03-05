import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Products from "./Products";

const mockStore = configureStore([]);

describe("Products Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      cart: [],
    });
  });

  it("should render products list", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "Product 1",
            image: "image1.jpg",
            category: "men's clothing",
          },
          {
            id: 2,
            title: "Product 2",
            image: "image2.jpg",
            category: "women's clothing",
          },
        ]),
    });

    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("Product 1")).toBeInTheDocument();
      expect(getByText("Product 2")).toBeInTheDocument();
      expect(getByAltText("Product 1")).toBeInTheDocument();
      expect(getByAltText("Product 2")).toBeInTheDocument();
    });
  });

  it("should add product to cart when add to cart button is clicked", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "Product 1",
            image: "image1.jpg",
            category: "men's clothing",
          },
        ]),
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(getByText("Add to Cart"));
    });

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "ADD_CART",
        payload: {
          id: 1,
          title: "Product 1",
          image: "image1.jpg",
          category: "men's clothing",
        },
      },
    ]);
  });
});
