import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./contextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart() || []; // Ensure data is an array
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let priceRef = useRef();
  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.foodItems._id) || null;

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItems._id,
        name: props.foodItems.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }

    console.log(data);
  };

  return (
    <div>
      <div className="card m-3" style={{ width: "18rem" }}>
        <img
          src={props.foodItems.img}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <p className="card-text">{props.foodItems.description}</p>
          <div className="w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5 mx-3">₹{finalPrice}/-</div>
            <hr></hr>
            <button
              onClick={handleAddToCart}
              className="btn bg-success text-black mx-1"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
