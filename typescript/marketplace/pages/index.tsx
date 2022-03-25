import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ConnectWalletButton } from "components/ConnectWallet";
import { MintSwordButton } from "components/MintSwordButton";
import { Listings } from "components/listings";
import { Wallet } from "components/Wallet";
import { Page } from "components/Page";
import React from "react";
import { useAddress } from "@thirdweb-dev/react";
const HomePage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const address = useAddress();

  return (
    <Page>
      <Flex flexDir="row" px={"16"}>
        {address ? (
          <>
            <Box p={4}>
              <Listings />
            </Box>
          </>
        ) : null}
      </Flex>
    </Page>
  );
};

export default HomePage;
