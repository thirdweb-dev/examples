import { Heading, Stack, Text } from "@chakra-ui/react";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import React from "react";

const ChainComponent: React.FC = () => {
  const { chainId } = useEthers();
  return <Text>Chain ID: {chainId ? chainId : "-"}</Text>;
};

const AccountComponent: React.FC = () => {
  const { account } = useEthers();
  return <Text>Account: {account ? account : "-"}</Text>;
};

const BalanceComponent: React.FC = () => {
  const { account } = useEthers();
  const balance = useEtherBalance(account);
  return (
    <Text>
      Balance: Ξ{balance ? formatEther(balance as BigNumber) : "0.00"}
    </Text>
  );
};

export const Wallet: React.FC = () => {
  return (
    <>
      <Stack px={2} py={4} rounded="lg" border="1px" spacing={1}>
        <Heading size="md">Connected Wallet</Heading>
        <ChainComponent />
        <AccountComponent />
        <BalanceComponent />
      </Stack>
    </>
  );
};
