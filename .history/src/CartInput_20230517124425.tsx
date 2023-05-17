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
  const [totalAmount, setTotalAmount] = useState<number>(50);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [amountToBePaid, setAmountToBePaid] = useState<number>(totalAmount);
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

  const handleDiscountApplication = (e: any) => {
    e.preventDefault();
    handleSearchDiscountCode();

    if (discountCodes.length > 0) {
      discountCodes.map((codeset) => {
        if (codeset.code === searchValue.toUpperCase() && !codeset.isUsed) {
          setDiscountAmount(totalAmount * codeset.discountPercentage);
          setAmountToBePaid(totalAmount - discountAmount);
          console.log("discount" + discountAmount, amountToBePaid);
        }
      });
    }
  };

  return (
    <div className="main-wrapper">
      <h2 className="content-header">Your cart</h2>
      <div className="detail-block">
        <h2>Total amount</h2>
        <h2>{totalAmount} €</h2>
      </div>
      <div className="detail-block">
        <h2>Discount</h2>
        <h2>{discountAmount}</h2>
      </div>
      <div className="detail-block">
        <h2>Amount to pay</h2>
        <h2>{amountToBePaid}</h2>
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
        <button type="submit" onClick={handleDiscountApplication}>
          Apply
        </button>
      </form>
      <p className="info-text">Something info text</p>
    </div>
  );
};

export default CartInput;
