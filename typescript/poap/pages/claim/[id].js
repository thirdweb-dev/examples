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
  useToast,
} from "@chakra-ui/react";
import parseIpfs from "../../utils/parseIpfs";

import { useRouter } from "next/router";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
export default function Create() {
  const toast = useToast();
  const router = useRouter();
  const [event, setEvent] = useState(undefined);
  const [signature, setSignature] = useState(undefined);
  const nftCollection = useNFTCollection(event?.address);
  useEffect(() => {
    fetch(`/api/list?id=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvent(data.events[0]);
        }
      });
  }, [router.query.id]);
  useEffect(() => {
    if (router.query.voucher) {
      setSignature(router.query.voucher);
    }
  }, [router.query.voucher]);

  async function handleSubmit() {
    const result = await fetch(`/api/get?id=${router.query.voucher}`).then(
      (res) => res.json()
    );
    if (result.success) {
      if (!(await nftCollection.signature.verify(result.signature))) {
        toast({
          title: "Invalid Voucher",
          description: "The voucher is either invalid or has expired.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await nftCollection.signature.mint(result.signature);
      }
    }
  }

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
          <Image src={parseipfs(event.image)} alt={event.name} />

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
              {!signature ? (
                <Input
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Paste Voucher"
                />
              ) : null}
              {signature ? (
                <Button width={"xs"} marginTop={5} onClick={handleSubmit}>
                  Claim NFT
                </Button>
              ) : null}
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
