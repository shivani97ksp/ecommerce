import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import "./products.css";
import { useNavigate } from "react-router-dom";

function Products() {
  const usenavigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      usenavigate("/login");
    }
  }, []);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
    return;
  };

  // const PrdDetails = (data2) => {
  //   console.log(data2);
  // }

  const fetchData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setFilter(data);
        localStorage.setItem("cart", JSON.stringify(data));
        // PrdDetails(data);
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (item) => {
    dispatch(addCart(item));
    console.log(item);
  };

  return (
    <div>
      {/* {console.log(typeof(data.id))} */}
      <div className="button d-flex justify-content-center mb-3">
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => setFilter(data)}
        >
          All Products
        </button>
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Collection
        </button>
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Collection
        </button>
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
      </div>

      <div className="clearfix">
        <div className="row justify-content-center">
          {filter.map((data) => (
            <div className="col-md-3 animated fadeIn d-flex mb-4" key={data.id}>
              <div className="card h-100 text-center">
                <div className="card-body text-center">
                  <div className="avatar" height="250px">
                    <img
                      src={data.image}
                      className="card-img-top"
                      alt=""
                      height="250px"
                    />
                  </div>

                  <div style={{ minHeight: "70px" }}>
                    <h6 className="card-title text-center" href="/#">
                      {data.title}
                    </h6>
                    {/* <p>{data.rating.rate}</p> */}
                    {/*correctedError*/}
                  </div>
                  <div className="row">
                    <NavLink className="col-7" to={`./${data.id}`}>
                      <button
                        className="btn btn-sm btn-outline-dark"
                        // onClick={() => PrdDetails(data)}
                      >
                        View Details
                      </button>
                    </NavLink>
                    <button
                      className="col-5 btn btn-sm btn-outline-dark"
                      onClick={() => addToCart(data)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {console.log("CHECK")}
      {console.log(data)} */}
    </div>
  );
}

export default Products;
