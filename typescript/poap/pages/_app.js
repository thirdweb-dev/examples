/// import { ThemeProvider } from "degen";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

import { ThirdwebProvider } from "@thirdweb-dev/react";

function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={1}>
      <ChakraProvider>
        <style global>{`
              body,modal,iframe,iframe * {
                background-color: #0e1012;
                color: #f9f6fd;
              }
            `}</style>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default App;
