import { Box, Flex, useColorMode } from "@chakra-ui/react";

import { Listings } from "components/listings";
import { Page } from "components/Page";
import React from "react";
import { useAddress } from "@thirdweb-dev/react";
const HomePage: React.FC = () => {
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
