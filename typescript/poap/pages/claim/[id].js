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
export default function Create() {
  const router = useRouter();
  const [event, setEvent] = useState(undefined);
  const nftCollection = useNFTCollection(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  );
  useEffect(() => {
    fetch(`/api/list?id=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvent(data.events[0]);
        }
      });
  }, [router.query.id]);

  return (
    <Page title={"Claim"} subheading={""}>
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

              <Button width={"xs"} marginTop={5}>
                Claim NFT
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
