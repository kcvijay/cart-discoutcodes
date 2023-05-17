import React, { useState } from "react";
import axios from "axios";

interface Codes {
  code: string;
  isUsed: boolean;
  discountPercentage: number;
  validUntil: Date;
}

const CartInput = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discountCodes, setDiscountCodes] = useState<Codes[]>([]);

  const handleSearchDiscountCode = async () => {
    setIsLoading(true);
    const res = await axios.get("http://localhost:4000/discountCodes");
    const;
  };

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
