import React, { useEffect, useState } from "react";
import axios from "axios";

interface Codes {
  index: number;
  code: string;
  isUsed: boolean;
  discountPercentage: number;
  validUntil: Date;
}

const CartInput = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(50);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [appliedDiscount, setAppliedDiscount] = useState<boolean>(false);
  const [amountToBePaid, setAmountToBePaid] = useState<number>(totalAmount);
  const [discountCodes, setDiscountCodes] = useState<Codes[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [infoText, setInfoText] = useState<string>("");

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

  const handleUsedDiscountCode = async (param: any) => {
    await axios
      .put(`http://localhost:4000/discountCodes/`, {
        param: { isUsed: true },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleDiscountApplication = async (e: any) => {
    e.preventDefault();
    await handleSearchDiscountCode();
  };

  useEffect(() => {
    if (discountCodes.length > 0) {
      const foundCodeSet = discountCodes.find(
        (codeset) =>
          codeset.code === searchValue.toUpperCase() && !codeset.isUsed
      );

      if (foundCodeSet) {
        setDiscountPercent(foundCodeSet.discountPercentage);
        setAmountToBePaid(
          totalAmount - totalAmount * foundCodeSet.discountPercentage
        );
        setInfoText(
          `${foundCodeSet.discountPercentage * 100}% discount is applied.`
        );
        setAppliedDiscount(true);
        handleUsedDiscountCode(foundCodeSet.isUsed);
      } else {
        setInfoText("Discount code is either not valid or already used.");
      }
    }
  }, [discountCodes]);

  // Rest of your code...

  return (
    <div className="main-wrapper">
      <h2 className="content-header">Your cart</h2>
      <div className="detail-block">
        <h2>Total amount</h2>
        <h2>{totalAmount} €</h2>
      </div>
      <div className="detail-block">
        <h2>Discount</h2>
        <h2>{totalAmount * discountPercent}</h2>
      </div>
      <div className="detail-block">
        <h2>Amount to pay</h2>
        <h2>{totalAmount - totalAmount * discountPercent}</h2>
      </div>

      <form>
        <label htmlFor="discountCode">Do you have a discount code?</label>
        <input
          type="text"
          name="discountCode"
          id="discountCode"
          placeholder="For ex. JFX0120"
          disabled={appliedDiscount}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          onClick={handleDiscountApplication}
          disabled={appliedDiscount}
        >
          Apply
        </button>
      </form>
      <p className="info-text">{infoText}</p>
    </div>
  );
};

export default CartInput;
