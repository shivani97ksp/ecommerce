import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style.css";

const Register = () => {
  const [id, idchange] = useState("");      // means username here
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [country, countrychange] = useState("india");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("female");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += " id";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      // toast.warning(errormessage)
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        //toast.warning('Please enter the valid email')
      }
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { id, password, email, phone, country, address, gender };
    console.log(regobj);
    if (IsValidate()) {
      //console.log(regobj);
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          //toast.success('Registered successfully.')
          navigate("/login");
        })
        .catch((err) => {
          //toast.error('Failed :' + err.message);
        });
    }
  };
  return (
    <div class="body1">
      <div class="container container2">
        <h1 class="form-title">Registration</h1>
        <form action="#" onSubmit={handlesubmit}>
          <div class="main-user-info">
            <div class="user-input-box">
              <label for="fullName">Username</label>
              <input
                type="text"
                value={id}
                onChange={(e) => idchange(e.target.value)}
                name="fullName"
                placeholder="Enter Username"
              />
            </div>
            <div class="user-input-box">
              <label for="username">Password</label>
              <input
                value={password}
                onChange={(e) => passwordchange(e.target.value)}
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <div class="user-input-box">
              <label for="email">Email</label>
              <input
                value={email}
                onChange={(e) => emailchange(e.target.value)}
                type="email"
                placeholder="Enter Email"
              />
            </div>
            <div class="user-input-box">
              <label for="phoneNumber">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => phonechange(e.target.value)}
                placeholder="Enter Phone Number"
              />
            </div>

            <div class="user-input-box">
              <label>Country</label>
              <select
                value={country}
                onChange={(e) => countrychange(e.target.value)}
                className="form-control"
              >
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="singapore">Singapore</option>
              </select>
            </div>
            <div class="user-input-box">
              <label>Address</label>
              <input
                value={address}
                onChange={(e) => addresschange(e.target.value)}
                className="form-control"
                placeholder="Enter Address"
              ></input>
            </div>
          </div>
          <div class="gender-details-box">
            <span class="gender-title">Gender</span>
            <div class="gender-category">
              <input
                type="radio"
                checked={gender === "male"}
                onChange={(e) => genderchange(e.target.value)}
                name="gender"
                value="male"
                className="app-check"
              ></input>
              <label>Male</label>
              <input
                type="radio"
                checked={gender === "female"}
                onChange={(e) => genderchange(e.target.value)}
                name="gender"
                value="female"
                className="app-check"
              ></input>
              <label>Female</label>
            </div>
          </div>
          <div class="form-submit-btn">
            <button type="submit" className="btn btn-primary">
              Register
            </button>{" "}
            |
            <Link to={"/login"} className="btn btn-danger">
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
