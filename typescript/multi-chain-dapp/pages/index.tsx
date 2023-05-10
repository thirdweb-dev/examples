import type { NextPage } from "next";

import { Web3Button } from "@thirdweb-dev/react";
import { useContext } from "react";
import ChainContext from "../context/Chain";

const Home: NextPage = () => {
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const addresses: Record<string, string> = {
    ["mumbai"]: "0x25CB5C350bD3062bEaE7458805Fb069200e37fD5",
    ["goerli"]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
  };

  return (
    <div>
      <select
        value={String(selectedChain)}
        onChange={(e) => setSelectedChain(e.target.value)}
      >
        <option value="mumbai">Mumbai</option>
        <option value="goerli">Goerli</option>
      </select>

      <div style={{ maxWidth: "200px" }}>
        <Web3Button
          contractAddress={addresses[selectedChain]}
          action={(contract) => contract.erc721.claim(1)}
        >
          Claim
        </Web3Button>
      </div>
    </div>
  );
};

export default Home;
