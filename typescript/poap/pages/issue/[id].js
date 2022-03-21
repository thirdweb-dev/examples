import Page from "../../components/Page";
import {
  VStack,
  Button,
  Link,
  Input,
  FormLabel,
  Box,
  Image,
  Badge,
  SimpleGrid,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
export default function Create() {
  const router = useRouter();
  const [event, setEvent] = useState(undefined);
  const [issuee, setIssuee] = useState(undefined);

  let nftCollection = useNFTCollection(event?.address);
  useEffect(() => {
    fetch(`/api/list?id=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvent(data.events[0]);
        }
      });
  }, [router.query.id]);
  async function handleSubmit() {
    alert(nftCollection.getAddress());
    const { signature } = await nftCollection.signature.generate({
      metadata: {
        name: event.name,
        description: event.description,
        image: event.image,
      },
      mintStartTime: new Date(),
      mintEndTime: new Date(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365),
      to: issuee,
    });
    alert(signature);
  }
  return (
    <Page title={"Issue NFT"} subheading={"Issue NFTs for an event"}>
      {event ? (
        <Box
          key={event.id}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={event.image} alt={event.name} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {event.chain}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {event.name}
            </Box>

            <Box>{event.description}</Box>
            <Box>
              <Input
                width={"xs"}
                marginTop={5}
                placeholder={"Address you want to issue to (optional)"}
                onChange={(e) => setIssuee(e.target.value)}
              />
              <Button width={"xs"} marginTop={5} onClick={handleSubmit}>
                Issue NFTs
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </Page>
  );
}
