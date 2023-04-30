import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // This is the chain your dApp will work on.
  const activeChain = "mumbai";

    /**
   * Make sure that your app is wrapped with these contexts.
   * If you're using React, you'll have to replace the Component setup with {children}
   */
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
