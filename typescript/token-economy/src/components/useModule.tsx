import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Signer } from "ethers";

const UseModule = () => {
  const { provider } = useWeb3();
  
  const sdk = useMemo(() => {
    if (provider) {
      return new ThirdwebSDK(provider?.getSigner() as Signer);
    }

    return undefined;
  }, [provider]);

//instantiate the sdk
  const tokenModule = useMemo(() => {
    if (sdk) {
      return sdk.getTokenModule("0x14F6991ee54Fc62Ff9E72E6f0C17e9625eDc947b");
    }

    return undefined;
  }, [sdk]);

  return tokenModule;
  
}

export default UseModule

