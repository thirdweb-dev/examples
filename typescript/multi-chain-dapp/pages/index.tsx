import type { NextPage } from "next";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useRecoilValue } from "recoil";
import HomeComponent from "../components/Home";
import ChainIdState from "../recoil/ChainId";

const Home: NextPage = () => {
  const selectedChain = useRecoilValue(ChainIdState);

  return (
    <ThirdwebProvider desiredChainId={selectedChain}>
      <HomeComponent />
    </ThirdwebProvider>
  );
};

export default Home;
