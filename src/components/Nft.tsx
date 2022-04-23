import { useEffect, useState } from 'react';
import { useEditionDrop } from '@thirdweb-dev/react';
import ClaimButton from './ClaimButton';

const Nft = () => {
  const editionDrop = useEditionDrop(
    '<CONTRACT_ADDRESS>'
  );
  const [nft, setNft] = useState('');

  async function fetchNft() {
    try {
      const nft = await editionDrop?.get('0');
      if (nft?.metadata.image) {
        setNft(nft?.metadata.image);
      }
    } catch (error) {
      console.log('Failed to get NFT. Error: ', error);
    }
  }

  useEffect(() => {
    fetchNft();
  }, []);

  return (
    <div style={{ margin: '10vh' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10vh' }}>
        Claim your early access NFT!
      </h1>
      <img
        alt='early access nft'
        src={nft}
        width='250px'
        height='250px'
        style={{ marginBottom: '5vh' }}
      />
      <ClaimButton />
    </div>
  );
};

export default Nft;
