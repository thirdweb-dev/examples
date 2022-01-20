import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { Signer } from "ethers";

export default function useSdk() {
  const { provider } = useWeb3();

  const sdk = new ThirdwebSDK(provider?.getSigner() as Signer);

  return sdk;
}
