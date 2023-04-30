import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // This is the chain your dApp will work on.
  const activeChain = "mumbai";

  return (
    <ThirdwebProvider
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
          },
        },
      }}
      activeChain={activeChain}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

