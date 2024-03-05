import React from "react";

import "./Login.css";

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Login = ({ show, setShow }) => {
  const [username, usernameupdate] = useState("");

  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          return res.json();
        })

        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            // toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              //toast.success("Success");

              sessionStorage.setItem("username", username);

              setShow(false);

              usenavigate("/");
            } else {
              //toast.error("Please Enter valid credentials");
            }
          }
        })

        .catch((err) => {
          //toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;

    if (username === "" || username === null) {
      result = false;

      // toast.warning("Please Enter Username");
    }

    if (password === "" || password === null) {
      result = false;

      //toast.warning("Please Enter Password");
    }

    return result;
  };

  return (
    <div class="container container1">
      <div class="left">
        <div class="header">
          <h2 class="animation a1">Welcome Back</h2>

          <h4 class="animation a2">
            Log in to your account using username and password
          </h4>
        </div>

        <form onSubmit={ProceedLogin}>
          <div class="form">
            <input
              value={username}
              onChange={(e) => usernameupdate(e.target.value)}
              class="form-field animation a3"
              placeholder="username"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => passwordupdate(e.target.value)}
              class="form-field animation a4"
              placeholder="Password"
            />

            <button type="submit" class="animation a6">
              LOGIN
            </button>

            <p>Dont have an account! Register here..</p>
            <Link className="btn btn-sm btn-primary linka" to={"/forgot-password"}>
              Forgot Password
            </Link>

            <Link className="btn btn-success linka" to={"/register"}>
              New User
            </Link>
          </div>
        </form>
      </div>

      <div class="right"></div>
    </div>
  );
};

export default Login;
