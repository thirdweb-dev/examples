import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "themes/chakraTheme";

const config = {};

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
  );
}

export default App;
