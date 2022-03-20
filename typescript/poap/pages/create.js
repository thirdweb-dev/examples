import Page from "../components/Page";
import {
  VStack,
  Button,
  Link,
  Input,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useNFTCollection } from "@thirdweb-dev/react";
export default function Create() {
  const nftCollection = useNFTCollection(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  );
  return (
    <Page
      title={"Create Event"}
      subheading={"Add a new contract to start issuing NFTs"}
    >
      <Input placeholder="Contract Address" width={"2xl"} marginTop={"2"} />
      <Input placeholder="Event Name" width={"2xl"} marginTop={"2"} />
      <Input placeholder="Event Description" width={"2xl"} marginTop={"2"} />
      {/* TODO: add image upload */}
      <Input placeholder="NFT Image URL" width={"2xl"} marginTop={"2"} />
      <Select placeholder="Select Chain" width={"2xl"} marginTop={"2"}>
        <option value="polygon">Polygon Mainnet</option>
        <option value="homestead">Ethereum Mainnet</option>
        <option value="mumbai">Polygon Mumbai Testnet</option>
        <option value="rinkeby">Ethereum Rinkeby Testnet</option>
        <option value="goerli">Ethereum Goerli Testnet</option>
      </Select>
      <Button width={"2xl"} marginTop={"5"}>
        Create Event
      </Button>
    </Page>
  );
}
