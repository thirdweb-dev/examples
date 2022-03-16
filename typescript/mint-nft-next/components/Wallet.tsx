import { Heading, Stack, Text } from "@chakra-ui/react";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";
import React from "react";
import { useAddress, useChainId, useSigner } from "@thirdweb-dev/react";

const ChainComponent: React.FC = () => {
  const chainId = useChainId();
  return <Text>Chain ID: {chainId ? chainId : "-"}</Text>;
};

const AccountComponent: React.FC = () => {
  const address = useAddress();
  return <Text>Account: {address ? address : "-"}</Text>;
};


export const Wallet: React.FC = () => {
  return (
    <>
      <Stack px={2} py={4} rounded="lg" border="1px" spacing={1}>
        <Heading size="md">Connected Wallet</Heading>
        <ChainComponent />
        <AccountComponent />
      </Stack>
    </>
  );
};
