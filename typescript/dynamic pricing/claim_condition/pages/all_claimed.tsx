import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/mystyles.module.css'
import { useNFTDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { NFTMetadata } from '@thirdweb-dev/sdk';

const Claimed: NextPage = () => {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();

    const nftDrop = useNFTDrop("0x82747Bd4e435C9D5cF2342c8361B19910259C264")
    const [token, setToken] = useState<NFTMetadata[]>([]);

    useEffect(() => {
        if (nftDrop) {
            nftDrop
                .getAllUnclaimed()
                .then((token) => {
                    setToken(token);
                })
                .catch((error) => {
                    console.error("failed to fetch nfts", error);
                });
        }
    }, [nftDrop]);

    console.log(token)

    return (
        <div>
            <div className={styles.nfts}>
                {token.map((nft) => (
                    <div className={styles.nfts_image}>
                        <img src={nft.image} style={{ maxHeight: 80 }} />
                        <p key={nft.id}>{nft.name}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Claimed;