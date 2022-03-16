import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ConnectWalletButton } from "components/ConnectWallet";
import { MintSwordButton } from "components/MintSwordButton";
import { SwordList } from "components/SwordList";
import { Wallet } from "components/Wallet";
import React from "react";
import { useAddress } from "@thirdweb-dev/react";
const HomePage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const address = useAddress();

  return (
    <Flex minH="100vh" flexDir="row" p={16}>
      <Box p={4}>
        <Heading mb={8}>thirdweb SDK Example</Heading>

        <FormControl display="flex" mb={4}>
          <FormLabel htmlFor="darkMode" mb="0">
            Dark Mode
          </FormLabel>
          <Switch
            isChecked={colorMode === "dark"}
            onChange={() => toggleColorMode()}
            id="darkMode"
          />
        </FormControl>

        {address ? (
          <>
            <Wallet />

            <Box mt={4}>
              <Text>Get your own Gold Sword</Text>
              <MintSwordButton />
            </Box>

            <Box mt={4}>
              <ConnectWalletButton />
            </Box>
          </>
        ) : (
          <>
            <Text fontWeight="bold">Connect wallet to mint NFTs</Text>{" "}
            <ConnectWalletButton />
          </>
        )}
      </Box>

      {address ? (
        <>
          <Box p={4}>
            <Text fontWeight="bold">All swords in the module:</Text>
            <SwordList />
          </Box>

          <Box p={4}>
            <Text fontWeight="bold">Sword owned by me:</Text>
            <SwordList />
          </Box>
        </>
      ) : null}
    </Flex>
  );
};

export default HomePage;
