import { ChainId } from "@thirdweb-dev/sdk";
import type { AppProps } from "next/app";
import { useState } from "react";
import ChainContext from "../context/Chain";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState(ChainId.Mumbai);

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ThirdwebProvider desiredChainId={selectedChain}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChainContext.Provider>
  );
}

export default MyApp;
