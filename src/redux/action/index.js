

//for add item to cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

//delete item from cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const deleteCart = (product) => {
  return {
    type: "DELPRODUCT",
    payload: product,
  };
};

