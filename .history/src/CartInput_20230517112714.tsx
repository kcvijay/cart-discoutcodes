import React from "react";

const CartInput = () => {
  return (
    <div className="main-wrapper">
      <h2 className="content-header">Your cart</h2>
      <div className="detail-block">
        <h2>Purchage amount</h2>
        <h2>{"50€"}</h2>
      </div>
      <div className="detail-block">
        <h2>Discount</h2>
        <h2>{"0"}</h2>
      </div>
    </div>
  );
};

export default CartInput;
