import Page from "../components/Page";
import { VStack, Button, Link } from "@chakra-ui/react";
export default function Home() {
  return (
    <Page title={"example"} subheading={""} hideNav>
      <VStack>
        <Link href="/claim">
          <Button width={"xl"}>Claim NFT</Button>
        </Link>
        {/* <Link href="/find">
          <Button width={"xl"}>Find Events</Button>
        </Link> */}
        <Link href="/issue">
          <Button width={"xl"}>Issue NFTs</Button>
        </Link>
        <Link href="/create">
          <Button width={"xl"}>Create an event</Button>
        </Link>
      </VStack>
    </Page>
  );
}
