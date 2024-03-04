import "./Navbar.css";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Navbar({ show, setShow }) {
  //const [show, setShow] = useState(true);
  let username = sessionStorage.getItem("username");
  useEffect(() => {
    if (username === "" || username === null) {
      setShow(true);
      console.log(show);
    } else {
      console.log(show);
      setShow(false);
    }
  }, [username]);
  const stateInp = useSelector((state) => {
    return state.rootReducers.handleCart;
  });

  const stateF = stateInp === null ? 0 : stateInp.map((x) => x.qty);
  let sum = 0;

  // Calculation the sum using forEach
  stateF &&
    stateF.length &&
    stateF.forEach((x) => {
      sum += x;
    });

  return (
    <>
      <script
        src="https://kit.fontawesome.com/6ec4c7a136.js"
        crossOrigin="anonymous"
      ></script>

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand fw-bold fs-4"
            to="/"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#fff",

                    background: "#040206",
                  }
                : { color: "#545e6f", background: "#f0f0f0" }
            }
          >
            D Store
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {!show && (
                  <NavLink
                    className="nav-link "
                    to="/"
                    end
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#fff",
                            background: "#7600dc",
                          }
                        : { color: "#545e6f", background: "#f0f0f0" }
                    }
                  >
                    <span>
                      <i className="fa-sharp fa-solid fa-house"></i>
                    </span>
                    Home
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                {!show && (
                  <NavLink
                    className="nav-link"
                    to="/about"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#fff",
                            background: "#7600dc",
                          }
                        : { color: "#545e6f", background: "#f0f0f0" }
                    }
                  >
                    About Us
                  </NavLink>
                )}
              </li>

              {/* <li className="nav-item dropdown">

          <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">

            Products

          </a>

          </li> */}

              <li className="nav-item">
                {!show && (
                  <NavLink
                    className="nav-link"
                    to="/products"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#fff",
                            background: "#7600dc",
                          }
                        : { color: "#545e6f", background: "#f0f0f0" }
                    }
                  >
                    Products
                  </NavLink>
                )}
              </li>

              {/* <ul class="dropdown-menu">

            <li><a className="dropdown-item" to="#">Clothes</a></li>

            <li><a className="dropdown-item" to="#">Footwear</a></li>

            <li><a className="dropdown-item" to="#">Electronic Devices</a></li>

          </ul>  */}

              <li className="nav-item">
                {!show && (
                  <NavLink
                    className="nav-link"
                    to="/contact"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "#fff",
                            background: "#7600dc",
                          }
                        : { color: "#545e6f", background: "#f0f0f0" }
                    }
                  >
                    Contact
                  </NavLink>
                )}
              </li>
            </ul>

            {/* <form className="d-flex" role="search">

              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />

              <button className="btn btn-outline-success" type="submit"><span><i class="fa-solid fa-magnifying-glass"></i></span></button>

            </form> */}

            <div className="buttons">
              {show && (
                <NavLink to="/login" className="btn btn-outline-dark">
                  <i className="fa fa-sign-in me-1"></i> Login
                </NavLink>
              )}
              {show && (
                <NavLink to="/register" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-user-plus me-1"></i> Register
                </NavLink>
              )}
              {!show && (
                <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-shopping-cart me-1"></i> Cart (
                  {stateF.length})
                </NavLink>
              )}
              {!show && (
                <NavLink
                  to="/login"
                  className="btn btn-outline-dark ms-2"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  {" "}
                  LogOut
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
