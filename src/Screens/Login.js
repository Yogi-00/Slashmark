import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: Credentials.email,
        password: Credentials.password,
      })
    );
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Credentials.email,
          password: Credentials.password,
        }),
      });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userEmail", Credentials.email);
        console.log(Credentials.email);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error("SYJ Error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-5">Login</h1>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="email"
              className="form-control-plaintext"
              id="staticEmail"
              onChange={onChange}
              value={Credentials.email}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword"
              onChange={onChange}
              value={Credentials.password}
            />
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-5 w-25">
            Login
          </button>
          <Link to="/createuser" className="btn btn-danger mt-5 mx-4">
            New User
          </Link>
        </div>
      </form>
    </div>
  );
}
