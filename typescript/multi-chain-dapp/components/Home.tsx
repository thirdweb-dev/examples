import { ChainId, Web3Button } from "@thirdweb-dev/react";
import { FC } from "react";
import { useRecoilState } from "recoil";
import ChainIdState from "../recoil/ChainId";

const HomeComponent: FC = () => {
  const [selectedChain, setSelectedChain] = useRecoilState(ChainIdState);

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
        <option value={ChainId.Mumbai}>Mumbai</option>
        <option value={ChainId.Goerli}>Goerli</option>
      </select>

      <Web3Button
        contractAddress={addresses[String(selectedChain)]}
        action={(contract) => contract.erc721.claim(1)}
      >
        Claim
      </Web3Button>
    </div>
  );
};
export default HomeComponent;
