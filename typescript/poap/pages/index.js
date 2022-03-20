import Page from "../components/Page";
import { VStack, Button, Link } from "@chakra-ui/react";
export default function Home() {
  return (
    <Page title={"example"} subheading={""}>
      <VStack>
        <Link href="/create">
          <Button width={"xl"}>Create an event</Button>
        </Link>
        <Link href="/create">
          <Button width={"xl"}>Find Events</Button>
        </Link>
      </VStack>
    </Page>
  );
}
