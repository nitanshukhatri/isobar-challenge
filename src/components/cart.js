import { useState } from "react";
import { cartContext } from "../App";
import React from "react";

function Cart(props) {
  const { cartItems } = props;
  return (
    <div className="Cart">
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
