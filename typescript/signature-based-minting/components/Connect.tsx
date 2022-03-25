import {
  ThirdwebProvider,
  useMetamask,
  ChainId,
  useAddress,
} from "@thirdweb-dev/react";
import { Flex } from "@chakra-ui/react";

export default function Connect() {
  // get a function to connect to a particular wallet
  // options: useMetamask() - useCoinbase() - useWalletConnect()
  const connectWithMetamask = useMetamask();
  // once connected, you can get the connected wallet information from anywhere (address, signer)
  const address = useAddress();
  return (
    <div>
      {address ? (
        <h4>Connected as {address}</h4>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
    </div>
  );
}
