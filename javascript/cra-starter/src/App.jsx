import { useEffect } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { UnsupportedChainIdError } from "@web3-react/core";

// We instantiate the sdk on Rinkeby.
const sdk = new ThirdwebSDK("rinkeby");

const App = () => {
  // Use the connectWallet hook thirdweb gives us.
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  // The signer is required to sign transactions on the blockchain.
  // Without it we can only read data, not write.
  const signer = provider ? provider.getSigner() : undefined;

  useEffect(() => {
    // We pass the signer to the sdk, which enables us to interact with
    // our deployed contract!
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  // We check here if the user is using a chain that we don't support.
  if (error instanceof UnsupportedChainIdError) {
    return (
      <div>
        <h2>Please connect to Rinkeby</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks
          in your connected wallet.
        </p>
      </div>
    );
  }

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div>
        <h1>Welcome to thirdweb</h1>
        <button onClick={() => connectWallet("injected")}>
          Connect your wallet
        </button>
      </div>
    );
  }

  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <div>
      <h1>Wallet connected!</h1>
    </div>);
};

export default App;