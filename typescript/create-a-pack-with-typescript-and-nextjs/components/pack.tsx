import { useWeb3 } from '@3rdweb/hooks';
import { NFTMetadata, ThirdwebSDK } from '@3rdweb/sdk';
import { Web3Provider } from '@ethersproject/providers';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from '../styles/Home.module.css';

const handleClick = async (
  address: string,
  provider: Web3Provider,
  setCollectedNfts: Dispatch<SetStateAction<NFTMetadata[]>>,
) => {
  const response = await fetch('/api/pack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
    }),
  });
  const body = await response.json();
  const sdk = new ThirdwebSDK(provider.getSigner());
  const module = sdk.getPackModule(body.packAddress);
  const openResult = await module.open(body.packId);
  setCollectedNfts(openResult);
};

export const Pack = () => {
  const { address, provider } = useWeb3();
  const [collectedNfts, setCollectedNfts] = useState([] as NFTMetadata[]);
  return (
    <div>
      <p>Mint a pack and see what luck you have today!</p>
      <div>
        <button
          className={styles.button}
          onClick={() =>
            handleClick(
              address as string,
              provider as Web3Provider,
              setCollectedNfts,
            )
          }
        >
          Mint
        </button>
      </div>
      {collectedNfts.length > 0 ? <p>Here is what you got!</p> : <p></p>}
      {collectedNfts.map((nft: NFTMetadata) => (
        <div key={nft.id}>
          <p>NFT id: {nft.id}</p>
          <img src={nft.image} alt="NFT Image" height={256} width={256} />
        </div>
      ))}
    </div>
  );
};
