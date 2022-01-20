import { ConnectWallet } from "@3rdweb/react";
import { Flex } from "@chakra-ui/react";

const Layout: React.FC = ({ children }) => {
  return (
    <Flex flexDir={"column"} padding={6}>
      <ConnectWallet></ConnectWallet>
      {children}
    </Flex>
  );
};

export default Layout;
