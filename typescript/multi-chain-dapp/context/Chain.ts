import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: "goerli",
  setSelectedChain: (chain: string) => {},
});

export default ChainContext;
