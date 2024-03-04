import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import "./Prod.css";
import { NavLink } from "react-router-dom";

function Prod(props) {
  // const data= (props);
  const [data1, setReqData] = useState([]);
  const [allData, setAllData] = useState([]);

  const dispatch = useDispatch();
  const addProduct = (data1) => {
    dispatch(addCart(data1));
    console.log(data1);
  };

  var params = useParams();
  var { id } = params;

  const fetchProductData = () => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllData(() => data);
      });
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    let currentProduct = null;
    if (allData.length) {
      currentProduct = allData.filter((item, index) => {
        return item.id === parseInt(id);
      });
      setReqData(() => currentProduct[0]);
    }
  }, [allData]);

  return (
    <div>
      <div className="container py-4">
        <div className="row py-4">
          <div className="col-md-5">
            <img src={data1.image} alt="" height="400px" width="300px" />
          </div>

          <div className="col-md-7">
            <br />
            <h4 className="text-uppercase text-black-50">{data1.category}</h4>
            <h1 className="display-5">{data1.title}</h1>
            <p className="lead">
              Rating<i className="fa fa-star"></i>
            </p>

            <h3 className="fw-bold p-2 text-black">${data1.price}</h3>

            <p className="lead">
              <b>Product Specifications: </b>
              {data1.description}
            </p>
            {/* {console.log(reqData.rating)} */}
            <button
              className="btn btn-outline-dark mx-2 px-3 py-2"
              onClick={() => addProduct(data1)}
            >
              Add to Cart
            </button>
            <NavLink to="/cart" className="btn btn-dark mx-2 px-3 py-2">
              Go to Cart
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prod;
