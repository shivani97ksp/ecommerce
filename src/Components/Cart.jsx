import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delCart } from "../redux/action/index";
import { addCart } from "../redux/action/index";
import { deleteCart } from "../redux/action/index";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

function Cart() {
  const cart = useSelector((state) => {
    return state.rootReducers.handleCart;
  });

  const [cartProducts, setCart] = useState(cart);
  const [totalSum, setTotalSum] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [coupen, setCoupen] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartElements = JSON.parse(localStorage.getItem("cart"));
    cartElements &&
      cartElements.length &&
      setCart(() => {
        return cartElements;
      });
  }, []);

  useEffect(() => {
    setCart(() => {
      return cart;
    });
  }, [cart]);

  useEffect(() => {
    var prd = cartProducts && cartProducts.length > 0;
    if (prd) {
      var sum = 0;
      var quanty = 0;
      for (let i = 0; i < cartProducts.length; i++) {
        {
          quanty = quanty + cartProducts[i].qty;
          sum = sum + cartProducts[i].qty * cartProducts[i].price;
        }
      }
      sum = sum.toFixed(2);

      if (coupen.localeCompare("EM500") === 0) {
        var l = (totalSum * 5) / 100;
        var m = totalSum - l;
        m = m.toFixed(2);
        setTotalPrice(m);
      } else {
        setTotalPrice(sum);
      }
      setTotalSum(sum);
      setTotalQuantity(quanty);
    }
  }, [cartProducts, coupen]);

  const dispatch = useDispatch();
  const removeProduct = (cartItem) => {
    dispatch(delCart(cartItem));
  };

  const addProduct = (cartItem) => {
    dispatch(addCart(cartItem));
  };

  const deleteProduct = (cartItem) => {
    dispatch(deleteCart(cartItem));
  };

  const usenavigate = useNavigate();
  const backToProducts = () => {
    usenavigate("/products");
  };

  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography
                            tag="h1"
                            className="fw-bold mb-0 text-success"
                          >
                            Shopping Cart
                          </MDBTypography>
                          <MDBTypography className="mb-0 text-success">
                            {(cartProducts && cartProducts.length) || 0}
                          </MDBTypography>
                        </div>

                        {cartProducts &&
                          cartProducts.map((item, index) => {
                            return (
                              <CartItems
                                item={item}
                                key={index}
                                removeProduct={removeProduct}
                                addProduct={addProduct}
                                deleteProduct={deleteProduct}
                              />
                            );
                          })}

                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <MDBCardText
                              tag="a"
                              href="#!"
                              className="text-body"
                              onClick={backToProducts}
                            >
                              <MDBIcon
                                fas
                                icon="long-arrow-alt-left me-2"
                                onClick={backToProducts}
                              />{" "}
                              Back to shop
                            </MDBCardText>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography
                          tag="h3"
                          className="fw-bold mb-5 mt-2 pt-1"
                        >
                          CHECKOUT
                        </MDBTypography>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-uppercase">
                            ITEMS :{" "}
                            {cartProducts && cartProducts.length > 0
                              ? totalQuantity
                              : 0}
                          </MDBTypography>
                          <MDBTypography tag="h5">
                            $
                            {cartProducts && cartProducts.length > 0
                              ? totalSum
                              : 0}
                          </MDBTypography>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Enter code
                        </MDBTypography>

                        <div className="mb-5">
                          <MDBInput
                            size="lg"
                            label="Get 5% Off"
                            placeholder="EM500"
                            value={coupen}
                            onChange={(e) => setCoupen(e.target.value)}
                          />
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Total price
                          </MDBTypography>
                          <MDBTypography tag="h5">${totalPrice}</MDBTypography>
                        </div>

                        <MDBBtn color="dark" block size="lg">
                          Register
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

const CartItems = (props) => {
  // write function to remove item
  const removeProduct = () => {
    props.removeProduct(props.item);
  };

  const addProduct = () => {
    props.addProduct(props.item);
  };

  const deleteProduct = () => {
    props.deleteProduct(props.item);
  };
  console.log("PROPS", props);

  const { title, image, price, qty } = props.item;

  return (
    <>
      <hr className="my-4" />

      <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
        <MDBCol md="2" lg="2" xl="2">
          <MDBCardImage
            src={image}
            fluid
            className="rounded-3"
            alt="Cotton T-shirt"
          />
        </MDBCol>
        <MDBCol md="3" lg="3" xl="3">
          <MDBTypography tag="h6" className="text-black mb-0">
            {title}
          </MDBTypography>
        </MDBCol>
        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
          <MDBBtn color="link" className="px-2" rippleDuration={0}>
            <MDBIcon fas icon="minus" onClick={removeProduct} />
          </MDBBtn>

          <MDBTypography className="p-2 mb-2 bg-gradient-light text-dark border border-success">
            {qty}
          </MDBTypography>

          <MDBBtn color="link" className="px-2" rippleDuration={0}>
            <MDBIcon fas icon="plus" onClick={addProduct} />
          </MDBBtn>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="text-end">
          <MDBTypography tag="h6" className="mb-0">
            ${qty * price}
          </MDBTypography>
        </MDBCol>
        <MDBCol md="1" lg="1" xl="1" className="text-end">
          <a href="#!" className="text-muted">
            <MDBIcon fas icon="times" onClick={deleteProduct} />
          </a>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Cart;
