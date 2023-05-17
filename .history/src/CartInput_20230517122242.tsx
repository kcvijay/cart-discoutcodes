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
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchDiscountCode = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/discountCodes");
      const codeData = res.data;
      setDiscountCodes(codeData);
      setIsLoading(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleDiscountApplication = () => {
    if (discountCodes[0].code === searchValue && !discountCodes[0].isUsed) {
      console.log("discount is applied");
    }
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
          placeholder="For ex. JFX0120"
          onChange={handleSearchChange}
        />
        <button>Apply</button>
      </form>
      <p className="info-text">Something info text</p>
    </div>
  );
};

export default CartInput;
