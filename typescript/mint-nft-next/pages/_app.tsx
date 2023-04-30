import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "themes/chakraTheme";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const config = {};

function App({ Component, pageProps }: AppProps): JSX.Element {
  // This is the chain your dApp will work on.
  const activeChain = "mumbai";

    /**
   * Make sure that your app is wrapped with these contexts.
   * If you're using React, you'll have to replace the Component setup with {children}
   */
  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider activeChain={activeChain}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default App;