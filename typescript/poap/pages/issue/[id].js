import QRCode from "qrcode";
import Page from "../../components/Page";
import {
  VStack,
  Button,
  Input,
  Heading,
  Box,
  Text,
  Image,
  Badge,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  toast,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useDisclosure } from "@chakra-ui/react";
export default function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [event, setEvent] = useState(undefined);
  const [issuee, setIssuee] = useState(undefined);
  const [qrCode, setQrCode] = useState(undefined);
  const [claimURL, setClaimURL] = useState(undefined);
  let nftCollection = useNFTCollection(event?.address);
  useEffect(() => {
    fetch(`/api/list?id=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvent(data.events[0]);
        } else {
          toast({
            title: "Invalid Event",
            description: "The event does not exist.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  }, [router.query.id]);
  async function handleSubmit() {
    alert("this might take some time!");
    const payload = {
      metadata: {
        name: event.name,
        description: event.description,
        image: event.image,
      },
      mintStartTime: new Date(),
      mintEndTime: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
      to: issuee,
    };
    console.log(payload);
    const signedPayload = await nftCollection.signature.generate(payload);
    const result = await fetch(`/api/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signedPayload,
      }),
    }).then(async (res) => await res.json());

    QRCode.toDataURL(
      `${window.location.href.replace("issue", "claim")}?voucher=${result.id}`,
      function (err, url) {
        setClaimURL(
          `${window.location.href.replace("issue", "claim")}?voucher=${
            result.id
          }`
        );
        console.log(claimURL);
        setQrCode(url);
        onOpen();
      }
    );
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
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody textAlign={"center"} textColor="black">
                    <Heading>Claim URL</Heading>
                    <Text>
                      Let the issuee scan this QR code to claim the NFT
                    </Text>
                    <Center>
                      <Image src={qrCode} alt={"qrCode"} />
                    </Center>
                    <Link href={claimURL}>
                      {" "}
                      <Button>Open URL</Button>
                    </Link>
                  </ModalBody>
                </ModalContent>
              </Modal>
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
