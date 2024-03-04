const cart = JSON.parse(localStorage.getItem("cart"))
  // ? JSON.parse(localStorage.getItem("cart"))
  // : null;

// pure function , 2 paramerts, 1 state, action

const handleCart = (state = cart, action) => {
  console.log("carr", cart);
  console.log("action", action);
  const product = action.payload;

  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  // localStorage.clear();
  switch (action.type) {
    case "ADDITEM":
      //CHECK if product already exist
      console.log(state);
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        //increase the quantity

        cartProducts = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );

        localStorage.setItem("cart", JSON.stringify(cartProducts));
        return cartProducts;
      } else {
        const product = action.payload;

        cartProducts = [...state, { ...product, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        return cartProducts;
      }

    case "DELITEM":
      const exist1 = state.find((x) => x.id === product.id);

      if (exist1.qty === 1) {
        cartProducts = state.filter((x) => x.id !== exist1.id);
      } else {
        cartProducts = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      return cartProducts;

    case "DELPRODUCT":
      const exist2 = state.find((x) => x.id === product.id);
      cartProducts = state.filter((x) => x.id !== exist2.id);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      return cartProducts;

    default:
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
  }
};

export default handleCart;
