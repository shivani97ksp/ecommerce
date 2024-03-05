import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./Cart";

const mockStore = configureStore([]);

describe("Cart Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rootReducers: {
        handleCart: [
          {
            title: "Product 1",
            image: "product1.jpg",
            price: 10,
            qty: 2,
          },
          {
            title: "Product 2",
            image: "product2.jpg",
            price: 15,
            qty: 1,
          },
        ],
      },
    });
  });

  it("should render cart items with correct information", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("$20")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
    expect(getByText("$15")).toBeInTheDocument();
  });

  it("should remove product from cart when remove button is clicked", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    fireEvent.click(getByText("Remove")); // Assuming the remove button has text 'Remove'

    expect(queryByText("Product 1")).not.toBeInTheDocument();
  });

  it("should add product to cart when add button is clicked", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    fireEvent.click(getByText("Add")); // Assuming the add button has text 'Add'

    expect(store.getActions()).toContainEqual({
      type: "ADD_CART",
      payload: {
        /* Payload here */
      },
    });
  });
});
