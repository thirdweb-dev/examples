import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { MintSwordButton } from "components/MintSwordButton";
import { Wallet } from "components/Wallet";
import { useAddress } from "@thirdweb-dev/react";
import { ConnectWalletButton } from "components/ConnectWallet";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import Link from "next/link";
export const Page = ({ children, showConfetti }: any) => {
  const address = useAddress();
  const windowSize = useWindowSize();
  const { colorMode, toggleColorMode } = useColorMode();
  const [confetti, setConfetti] = useState<any>();

  useEffect(() => {
    if (showConfetti && windowSize) {
      setConfetti(
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
        />
      );
    }
  }, []);
  return (
    <>
      {confetti}
      <Flex flexDir="row" px={16}>
        <Box p={4}>
          <Link href="/">
          <Heading marginTop={0} mb={8}>
            thirdweb marketplace
          </Heading>
          </Link>

          <Flex>
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

                <Box mx={"5"}>
                  <MintSwordButton />
                </Box>

                <Box mx={"5"}>
                  <ConnectWalletButton />
                </Box>
              </>
            ) : (
              <>
                <Flex>
                  <ConnectWalletButton />
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Flex>
      {children}
    </>
  );
};
