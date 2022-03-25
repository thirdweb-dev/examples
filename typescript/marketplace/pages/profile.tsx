import { Box, Flex, useColorMode } from "@chakra-ui/react";

import { Profile } from "components/profile";
import { Page } from "components/Page";
import React from "react";
import { useAddress } from "@thirdweb-dev/react";
const HomePage: React.FC = () => {
  const address = useAddress();

  return (
    <Page>
        {address ? (
          <>
            <Box p={4}>
              <Profile />
            </Box>
          </>
        ) : null}
    </Page>
  );
};

export default HomePage;
