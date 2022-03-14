import { useAddress, useMetamask, useNFTDrop } from '@thirdweb-dev/react';

export const ClaimButton = () => {
  const connectWithMetamask = useMetamask();
  const nftDrop = useNFTDrop('0xA9F8815255E2fDC1CB2E164dE1bEedfD815D421B');
  const address = useAddress();
  return (
    <div>
      {address ? (
        <button onClick={() => nftDrop?.claim(1)}>Claim 1</button>
      ) : (
        <button onClick={connectWithMetamask}>Connect Wallet</button>
      )}
    </div>
  );
};
