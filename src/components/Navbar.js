import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Badge from "react-bootstrap/Badge";
import Modals from "../Modals";
import Cart from "../Screens/Cart";
import { useCart } from "./contextReducer";

export default function Navbar() {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            SYJ Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/myOrder0"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <div
                      className="nav-link active fs-5"
                      aria-current="page"
                      onClick={() => {
                        setCartView(true);
                      }}
                    >
                      My Cart {"  "}
                      {/* <Badge pill bg="danger">
                        {" "}
                        {data.length}{" "}
                      </Badge> */}
                    </div>
                    {cartView ? (
                      <Modals onclose={() => setCartView(false)}>
                        <Cart />
                      </Modals>
                    ) : null}
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className=" btn btn bg-white text-success mx-1 fw-bolder"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn bg-white text-success mx-1 fw-bolder"
                  to="/createuser"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className=" btn btn bg-white text-danger mx-2 fw-bolder"
                  onClick={handleLogOut}
                >
                  LogOut
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
