import { ThirdwebProvider } from "@3rdweb/react";
import { ChakraProvider } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

const supportedChainIds = [1, 4, 137, 80001];

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <ThirdwebProvider
        desiredChainId={supportedChainIds}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThirdwebProvider>
    </ChakraProvider>
  );
};

export default MyApp;
