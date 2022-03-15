import { useState } from 'react';
import { useEditionDrop, useMetamask, useAddress } from '@thirdweb-dev/react';

const ClaimButton = () => {
  const connectWithMetamask = useMetamask();
  const editionDrop = useEditionDrop(
    '<CONTRACT_ADDRESS>'
  );
  const address = useAddress();
  // State to track when a user is claiming an NFT
  const [claiming, setClaiming] = useState(false);

  // Claim our NFT with the claim method - (token id, quantity)
  const onClick = async () => {
    setClaiming(true);
    try {
      await editionDrop?.claim(0, 1);
      alert('Successfully Claimed!');
      setClaiming(false);
    } catch (error) {
      console.log('Failed to claim. Error: ', error);
      setClaiming(false);
    }
  };

  return (
    <div>
      {address ? (
        <button
          disabled={claiming}
          style={{
            padding: '10px 20px',
            textAlign: 'center',
            backgroundColor: '#05A266',
            color: 'white',
          }}
          
          className='btn'
          onClick={onClick}
        >
          {claiming ? 'Claiming...' : 'Claim Early Access NFT'}
        </button>
      ) : (
        <button onClick={connectWithMetamask}>Connect MetaMask Wallet</button>
      )}
    </div>
  );
};

export default ClaimButton;
