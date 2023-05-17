import React from "react";

const CartInput = () => {
  const date = new Date();
  console.log(date.toJSON());
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

      <form>
        <label htmlFor="discountCode">Do you have a discount code?</label>
        <input
          type="text"
          name="discountCode"
          id="discountCode"
          placeholder="For ex. JFX0120C"
        />
        <button>Apply</button>
      </form>
      <p className="info-text">Something info text</p>
    </div>
  );
};

export default CartInput;
