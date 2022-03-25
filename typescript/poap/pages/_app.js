/// import { ThemeProvider } from "degen";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

import { ThirdwebProvider } from "@thirdweb-dev/react";

function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={8001}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default App;
