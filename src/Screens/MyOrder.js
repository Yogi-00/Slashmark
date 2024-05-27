import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    console.log("Fetching order data...");
    console.log(localStorage.getItem("userEmail"));
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData && orderData.length > 0 ? (
            orderData.map((data, index) => (
              <div key={index}>
                {data.Order_data &&
                Array.isArray(data.Order_data) &&
                data.Order_data.length > 0 ? (
                  data.Order_data.map((orderGroup, orderIndex) => (
                    <div key={orderIndex}>
                      {orderGroup.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item.order_date ? (
                            <div className="m-auto mt-5">
                              <div>{item.order_date}</div>
                              <hr />
                            </div>
                          ) : (
                            <div className="col-12 col-md-6 col-lg-3">
                              <div
                                className="card mt-3"
                                style={{
                                  width: "16rem",
                                  maxHeight: "360px",
                                }}
                              >
                                <img
                                  src={item.img || "placeholder.jpg"}
                                  className="card-img-top"
                                  alt={item.name}
                                  style={{
                                    height: "120px",
                                    objectFit: "fill",
                                  }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">{item.name}</h5>
                                  <div
                                    className="container w-100 p-0"
                                    style={{ height: "38px" }}
                                  >
                                    <span className="m-1">{item.qty}</span>
                                    <span className="m-1">{item.size}</span>
                                    <span className="m-1">
                                      {
                                        data.Order_data[orderIndex][0]
                                          .order_date
                                      }
                                    </span>
                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                      ₹{item.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div>No order data found</div>
                )}
              </div>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
