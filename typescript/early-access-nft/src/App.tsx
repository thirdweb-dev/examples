import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import Nft from "./components/Nft";

const activeChainId = ChainId.Mumbai;

function App() {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Nft />
    </ThirdwebProvider>
  );
}

export default App;
