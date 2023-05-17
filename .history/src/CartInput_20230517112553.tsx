import React from "react";

const CartInput = () => {
  return (
    <div className="main-wrapper">
      <h2 className="content-header">Your cart</h2>
      <div className="detail-block">
        <h2>Total to pay:</h2>
        <h2>{"50€"}</h2>
      </div>
    </div>
  );
};

export default CartInput;
