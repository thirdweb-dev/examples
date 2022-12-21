import { useEffect, useState } from "react";
import { useContract, Web3Button } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";

const editionDropAddress = "CONTRACT_ADDRESS";

const Nft = () => {
  const { contract: editionDrop, isLoading: isEditionDropLoading } =
    useContract(editionDropAddress, "edition-drop");
  const [nft, setNft] = useState("");

  async function fetchNft() {
    try {
      if (isEditionDropLoading) return;
      const nft = await editionDrop?.get("0");
      if (nft?.metadata.image) {
        setNft(nft?.metadata.image);
      }
    } catch (error) {
      console.log("Failed to get NFT. Error: ", error);
    }
  }

  async function claim(contract: SmartContract<BaseContract>) {
    try {
      await contract.erc1155.claim(0, 1);
      alert("Successfully claimed early access NFT!");
    } catch (err) {
      alert("Failed to claim early access NFT!");
    }
  }

  useEffect(() => {
    fetchNft();
  }, [isEditionDropLoading]);

  return (
    <div style={{ margin: "10vh" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10vh" }}>
        Claim your early access NFT!
      </h1>
      <img
        alt="early access nft"
        src={nft}
        width="250px"
        height="250px"
        style={{ marginBottom: "5vh" }}
      />
      {/* <ClaimButton /> */}
      <div style={{ width: "250px" }}>
        <Web3Button contractAddress={editionDropAddress} action={claim}>
          Claim early access NFT!
        </Web3Button>
      </div>
    </div>
  );
};

export default Nft;
