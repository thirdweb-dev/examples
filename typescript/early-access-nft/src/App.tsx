import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import Nft from './components/Nft';

function App() {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Nft />
    </ThirdwebProvider>
  );
}

export default App;
