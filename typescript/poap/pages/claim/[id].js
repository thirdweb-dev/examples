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
import { useNFTCollection, useChainId } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
export default function Create() {
  const chainId = useChainId();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (chainId !== 80001) {
      toast({
        title: "Invalid Chain",
        description: "Make sure you are connected to the Mumbai.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    const result = await fetch(`/api/get?id=${router.query.voucher || signature}`).then(
      (res) => res.json()
    );
    if (result.success) {
      await nftCollection.signature
        .mint(result.signature)
        .then(() => {
          toast({
            title: "Voucher Claimed",
            description: "You have successfully claimed the voucher.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "ERROR",
            description: err.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
    setLoading(false);
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
          <Image src={parseIpfs(event.image)} alt={event.name} />

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
                  {loading ? <Spinner /> : "Claim NFT"}
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
