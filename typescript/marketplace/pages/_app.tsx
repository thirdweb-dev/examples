import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "themes/chakraTheme";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
const config = {};


function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default App;
