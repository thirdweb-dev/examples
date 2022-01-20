import { useWeb3 } from "@3rdweb/hooks";
import { useState } from "react";
import { ethers } from "ethers";
import UseModule from "../useModule";
import './buttons.css';

//use the wallet instead of private keys
const Buttons = () => {
  const { provider , address } = useWeb3();
  let [mintInputValue, setMintInputValue] = useState('');
  let [burnInputValue, setBurnInputValue] = useState('');

  const tokenModule = UseModule();

  const mintTo = async (amount: any) => {
    amount = ethers.utils.parseEther(amount)
    await tokenModule!.mintTo(address!, amount)
      .then((data: any) => console.log(data))
      .catch((error: any) => console.error(error));
  };

  const burn = async (amount: any) => {
    amount = ethers.utils.parseEther(amount)
    await tokenModule!.burn(amount)
      .then((data: any) => console.log(data))
      .catch((error: any) => console.error(error));
  };


  return (
    <>
      <div className="input-btn-container">
        <input style={{ padding: "12px 20px", margin: "8px 0", boxSizing: "border-box" }}
          type="text"
          value={mintInputValue}
          onChange={e => setMintInputValue(e.target.value)}
        />
        <button type="button" onClick={() => { mintTo(mintInputValue) }}>Mint</button>

      </div>
      <div className="input-btn-container">
        <input style={{ padding: "12px 20px", margin: "8px 0", boxSizing: "border-box" }}
          type="text"
          value={burnInputValue}
          onChange={e => setBurnInputValue(e.target.value)}
        />
        <button type="button" onClick={() => { burn(burnInputValue) }}>Burn</button>
      </div>

    </>
  );
};
export default Buttons;