import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Profile from "../components/Profile";

export const ConnectMetamaskButtonComponent = () => {
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
};

export default function Home() {
  const address = useAddress();

  return (
    <div>
      <ConnectMetamaskButtonComponent />
      {address ? <Profile /> : <h1>Please connect your wallet</h1>}
    </div>
  );
}
