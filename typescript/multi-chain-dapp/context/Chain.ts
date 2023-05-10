import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: "mainnet",
  setSelectedChain: (chain: string) => {},
});

export default ChainContext;
