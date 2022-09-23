import { ChainId } from "@thirdweb-dev/sdk";
import type { AppProps } from "next/app";
import { useContext, useState } from "react";
import ChainContext from "../context/Chain";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState(ChainId.Mumbai);

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <Component {...pageProps} />
    </ChainContext.Provider>
  );
}

export default MyApp;
