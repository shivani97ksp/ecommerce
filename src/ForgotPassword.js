import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Assuming you have an endpoint for updating passwords
    fetch("http://localhost:8000/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    })
      .then((res) => {
        if (res.ok) {
          // Password updated successfully
          // Redirect user to login page or any other appropriate page
          navigate("/login");
        } else {
          // Handle error cases
          // You might want to differentiate between different error responses
          // For example, if the email doesn't exist in the database
          setErrorMessage("Failed to update password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Failed to update password. Please try again.");
      });
  };

  return (
    <div className="body1">
      <div className="container container2">
        <h1 className="form-title">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="user-input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>
          <div className="user-input-box">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
            />
          </div>
          <div className="user-input-box">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-submit-btn">
            <button type="submit" className="btn btn-primary">
              Update Password
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

export default ForgotPassword;