import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";

import "tailwindcss/tailwind.css";

const supportedChainIds = [1, 4, 137];
const connectors = {
  injected: {},
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <YourApp />
    </ThirdwebProvider>
    </ChakraProvider>
  );
};

export default MyApp;
