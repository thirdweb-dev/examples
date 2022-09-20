import { ChainId } from "@thirdweb-dev/sdk";
import { atom } from "recoil";

const ChainIdState = atom<number>({
  key: "ChainIdState",
  default: ChainId.Goerli,
});

export default ChainIdState;
