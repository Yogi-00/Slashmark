import React from "react";
import { useCart, useDispatchCart } from "../components/contextReducer";

export default function Cart() {
  let data = useCart() || [];
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="mt-5 text-center fs-2">The Cart is Empty</div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(data);
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("Order Response: ", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  return (
    <div className="container my-5">
      <table className="table">
        <thead>
          <tr style={{ color: "green", fontSize: "25px" }}>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => {
            return (
              <tr>
                <th>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    className="btn btn bg-danger text-black mx-1 fw-bolder"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="fs-2">
        <h1>Toatal Price : {totalPrice}</h1>
      </div>
      <button className="btn bg-success mx-1 my-5" onClick={handleCheckOut}>
        Check Out
      </button>
    </div>
  );
}
