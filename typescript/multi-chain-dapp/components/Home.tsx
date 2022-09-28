import { ChainId, Web3Button } from "@thirdweb-dev/react";
import { FC, useContext } from "react";
import ChainContext from "../context/Chain";

const HomeComponent: FC = () => {
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const addresses = {
    [String(ChainId.Mumbai)]: "0x25CB5C350bD3062bEaE7458805Fb069200e37fD5",
    [String(ChainId.Goerli)]: "0xA72234a2b9c1601593062f333D739C93291dF49F",
  };

  return (
    <div>
      <select
        value={String(selectedChain)}
        onChange={(e) => setSelectedChain(parseInt(e.target.value))}
      >
        <option value={String(ChainId.Mumbai)}>Mumbai</option>
        <option value={String(ChainId.Goerli)}>Goerli</option>
      </select>

      <div style={{ maxWidth: "200px" }}>
        <Web3Button
          contractAddress={addresses[String(selectedChain)]}
          action={(contract) => contract.erc721.claim(1)}
        >
          Claim
        </Web3Button>
      </div>
    </div>
  );
};
export default HomeComponent;
