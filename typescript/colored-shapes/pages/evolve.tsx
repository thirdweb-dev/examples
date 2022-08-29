import {
  useAddress,
  useEditionDrop,
  useMetamask,
  useNFTCollection,
  useNFTDrop,
} from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Evolve.module.css";

const Evolve: NextPage = () => {
  const shapesDrop = useNFTDrop("0x22c7Ef5e6D6d5949fF82290a84C36e74FF6d9869");
  const colorsDrop = useEditionDrop(
    "0xBAb735464259593eD055821b0b17a079dcBd1f5f"
  );
  const nftCollection = useNFTCollection(
    "0x8fC2d4D86eA1836c69CABA231670D93dc3942612"
  );
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const [userShapes, setUserShapes] = useState<
    NFTMetadataOwner[] | undefined
  >();
  const [userColors, setUserColors] = useState<
    NFTMetadataOwner[] | undefined
  >();
  const [selectedShape, setSelectedShape] = useState<BigNumber | undefined>();
  const [selectedColor, setSelectedColor] = useState<BigNumber | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      const getData = async () => {
        const shapes = await shapesDrop?.getOwned(address);
        setUserShapes(shapes);

        const colors = await colorsDrop?.getOwned(address);
        setUserColors(colors);
      };

      getData();
    }
  }, [address, shapesDrop, colorsDrop]);

  const mintWithSignature = async () => {
    setLoading(true);
    const signedPayloadReq = await fetch(`/api/sig-mint`, {
      method: "POST",
      body: JSON.stringify({ shape: selectedShape, color: selectedColor }),
    });

    const signedPayload = await signedPayloadReq.json();
    console.log(signedPayload);

    if (signedPayload.signedPayload) {
      try {
        const burntNFT = await colorsDrop?.burn(selectedColor!, 1);
        console.log(burntNFT);
      } catch (e) {
        console.log(e);
      }
    }

    try {
      const nft = await nftCollection?.signature.mint(
        signedPayload.signedPayload
      );
      console.log(nft);
      return nft;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {address ? (
        <>
          <div className={styles.main}>
            <div className={styles.NFTsWrapper}>
              <h1>Shapes</h1>
              <div className={styles.NFTsContainer}>
                {userShapes?.map((nft: any) => (
                  <div className={styles.NFT} key={nft.metadata.name}>
                    <Image
                      alt={nft.metadata.name}
                      width="100px"
                      height="100px"
                      objectFit="contain"
                      src={nft.metadata.image}
                    />
                    <p className={styles.NFTName}>{nft.metadata.name}</p>
                    <button
                      className={styles.btn}
                      onClick={() => setSelectedShape(nft.metadata.id)}
                    >
                      {selectedShape === nft.metadata.id
                        ? "selected"
                        : "select"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.NFTsWrapper}>
              <h1>Colors</h1>
              <div className={styles.NFTsContainer}>
                {userColors?.map((nft: any) => (
                  <div className={styles.NFT} key={nft.metadata.name}>
                    <Image
                      alt={nft.metadata.name}
                      width="100px"
                      height="100px"
                      objectFit="contain"
                      src={nft.metadata.image}
                    />
                    <p className={styles.NFTName}>{nft.metadata.name}</p>
                    <button
                      className={styles.btn}
                      onClick={() => setSelectedColor(nft.metadata.id)}
                    >
                      {selectedColor === nft.metadata.id
                        ? "selected"
                        : "select"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            style={{ margin: "10px" }}
            className={styles.btn}
            onClick={() => mintWithSignature()}
            disabled={!selectedShape || !selectedColor || loading}
          >
            {loading ? "loading..." : "mint"}
          </button>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Evolve;
