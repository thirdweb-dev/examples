import type { NextPage } from "next";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import HomeComponent from "../components/Home";
import { useContext } from "react";
import ChainContext from "../context/Chain";

const Home: NextPage = () => {
  const { selectedChain } = useContext(ChainContext);

  return (
    <ThirdwebProvider desiredChainId={selectedChain}>
      <HomeComponent />
    </ThirdwebProvider>
  );
};

export default Home;
