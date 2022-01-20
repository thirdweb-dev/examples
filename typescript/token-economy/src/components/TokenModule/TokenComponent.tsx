import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import UseModule from "../useModule";

//use the wallet instead of private keys
const TokenComponent = (props: any) => {
  const { provider } = useWeb3();
  let [balance, setBalance] = useState(0);
  let [totalSupply, setTotalSupply] = useState(0);

  const tokenModule = UseModule();

  //get the balance from our token module
  useEffect(() => {
    const getBalance = async () => {
      const tokenBalance = await tokenModule!.balance()
      setBalance(parseInt(tokenBalance.displayValue));
    }

    const getTotalSupply = async () => {
      const totalSupply = await tokenModule!.totalSupply();
      setTotalSupply(parseInt(ethers.utils.formatEther(totalSupply)));
    }

    if (tokenModule) {
      getBalance()
      getTotalSupply()
    };
  }, [tokenModule]);


  function renderSwitch(param: any) {
    switch (param) {
      case 'balance':
        return balance
      case 'supply':
        return totalSupply
      default:
        return '';
    }
  }

  return (
    <>
      {renderSwitch(props.type)}
    </>
  );
};
export default TokenComponent;