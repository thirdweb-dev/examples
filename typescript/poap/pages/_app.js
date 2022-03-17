/// import { ThemeProvider } from "degen";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
// import "degen/styles";
import NextLink from "next/link";
import { ThemeProvider } from "degen";
import "degen/styles";
import { SaasProvider, baseTheme, ModalsProvider } from "@saas-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider defaultMode="dark" defaultAccent={"purple"}>
      <ThirdwebProvider desiredChainId={1}>
        <ChakraProvider>
          <SaasProvider cookies={pageProps.cookies} linkComponent={NextLink}>
            <ModalsProvider>
              <style global>{`
              body,modal,iframe,iframe * {
                background-color: #0e1012;
                color: #f9f6fd;
              }
            `}</style>
              <Component {...pageProps} />
            </ModalsProvider>
          </SaasProvider>
        </ChakraProvider>
      </ThirdwebProvider>
    </ThemeProvider>
  );
}

export default App;
