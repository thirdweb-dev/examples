
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/mystyles.module.css'
import Image from 'next/image';
import tw from '../public/tw.png'
import { useNFTDrop, useSigner } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { utils } from 'ethers';

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const nftDrop = useNFTDrop("0x82747Bd4e435C9D5cF2342c8361B19910259C264")
  const nftDropClaim = useNFTDrop("0x53D3c05fb634aCC87C569583fDB4718bD3186b24");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimed, setClaimed] = useState(0);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    if (nftDrop) {
      nftDrop?.totalClaimedSupply()
        .then((claimed) => {
          setClaimed(claimed);
        })
    }
  }, [claimed, nftDrop])

  useEffect(() => {
    if (nftDrop) {
      const all = nftDrop?.claimConditions.getAll()
      all[0]?.maxQuantity
        .then((claimed) => {
          setClaimed(claimed);
        })
    }
  }, [claimed, nftDrop])

  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const nfts = await nftDropClaim.getOwned(address);
        setHasClaimedNFT(nfts?.length > 0);
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get NFTs", error);
      }
    };

    checkBalance();
  }, [address, nftDropClaim]);

  const mintClaimNft = async () => {
    try {
      setIsClaiming(true);
      await nftDropClaim.claim(1);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };
  //define the same prices as your claim conditions.
  //info here will be used for our front end
  const price_early = 0.01
  const price_normal = 0.02

  //define the same max claim-limit as your first maxclaimcondition
  const claimLimit = 42

  const mintNft = async () => {
    const all_claimed = await nftDrop?.getAllClaimed()
    const claimed_price = await nftDrop?.claimConditions.getActive()
    const price_2 = await claimed_price?.price.toString()
    const price_3 = await utils.formatEther(price_2)
    const phases = await nftDrop?.claimConditions.getAll()
    const phase1 = await phases[0].maxQuantity
    console.log(phase1)
    console.log(price_3)
    console.log(all_claimed?.length)
    if (all_claimed.length = phase1) {
      await fetch("/api/condition", {
        method: "POST",
      });
      console.log("updating claimphase")
    };
    await nftDrop?.claim(1)
  };

  if (!address) {
    return <div className={styles.mintnft}><button className={styles.mintnftbutton} onClick={connectWithMetamask}>Connect with Metamask</button></div>;
  }

  return (

    <div className={styles.body}>

      {/* check if user has an access nft if not allow the user to mint an access nft */}

      {
        !hasClaimedNFT ? (
          <div className={styles.mintnft}>
            <button className={styles.mintnftbutton} disabled={isClaiming} onClick={mintClaimNft}>Mint NFT</button>
          </div>
        ) : (
          // if user has nft load page
          <div>
            <div className={styles.myheader}>
              <p>Welcome: {address}</p>
              <button className={styles.mintnftbutton} onClick={disconnectWallet}>Disconnect Wallet</button>
            </div>
            {/* big image and titel */}
            <div className={styles.hero}>
              <Image className={styles.hero_image}
                src={tw}
                alt="Picture of the author"
                width="700px"
                height="500px"
              />
              <div>

                <p className={styles.hero_text}>Claiming has started!</p>
              </div>
            </div>

            {/* mint nft button */}
            <div className={styles.nfts}>
            {claimed >= claimLimit ? (
              <div>
                <p>price is {price_normal} </p>
              </div>
            ) : (
              <div>
                <p>price is {price_early}</p>
              </div>
            )}

            
              <button className={styles.mintnftbutton} onClick={mintNft}>click here to mint NFT</button>
            </div>

          </div>

        )}

    </div>
  );
};

export default Home;

