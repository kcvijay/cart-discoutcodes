import React from "react";

const CartInput = () => {
  return (
    <div className="main-wrapper">
      <h2 className="content-header">Your cart</h2>
      <div className="detail-block">
        <h2>Total amount</h2>
        <h2>{"50€"}</h2>
      </div>
      <div className="detail-block">
        <h2>Discount</h2>
        <h2>{"0"}</h2>
      </div>
      <p>Do you have a discount code?</p>
      <form>
        <label htmlFor="discountCode">Discount code</label>
        <input
          type="text"
          name="discountCode"
          id="discountCode"
          placeholder="For ex. JFX0120C"
        />
      </form>
    </div>
  );
};

export default CartInput;
