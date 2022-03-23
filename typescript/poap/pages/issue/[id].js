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
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  toast,
  Link,
  Spinner,
  useToast,
  useClipboard,
} from "@chakra-ui/react";
import parseIpfs from "../../utils/parseIpfs";

import { useRouter } from "next/router";
import { useNFTCollection, useChainId } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
export default function Create() {
  const chainId = useChainId();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [event, setEvent] = useState(undefined);
  const [issuee, setIssuee] = useState(undefined);
  const [qrCode, setQrCode] = useState(undefined);
  const [claimURL, setClaimURL] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { onCopy, value } = useClipboard(claimURL?.split("=")[1]);
  const copy = () => {
    onCopy();
    toast({
      title: "Copied",
      description: "Copied to clipboard",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
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
    setLoading(true);
    if (chainId !== 80001) {
      toast({
        title: "Invalid Chain",
        description: `Make sure you are connected to the Mumbai. You are connected to ${chainId}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
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
    await nftCollection.signature
      .generate(payload)
      .then(async (res) => {
        const result = await fetch(`/api/store`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signedPayload: res,
          }),
        })
          .then(async (res) => await res.json())
          .catch((err) => {
            console.log(err);
            toast({
              title: "Error",
              description: "An error occurred while creating the voucher.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setLoading(false);
          });

        QRCode.toDataURL(
          `${window.location.href.replace("issue", "claim")}?voucher=${
            result.id
          }`,
          function (err, url) {
            setClaimURL(
              `${window.location.href.replace("issue", "claim")}?voucher=${
                result.id
              }`
            );
            console.log(claimURL);
            setQrCode(url);
            setLoading(false);
            onOpen();
          }
        );
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      });
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
              <Input
                width={"xs"}
                marginTop={5}
                placeholder={"Address you want to issue to (optional)"}
                onChange={(e) => setIssuee(e.target.value)}
              />
              <Button width={"xs"} marginTop={5} onClick={handleSubmit}>
                {loading ? <Spinner /> : "Issue NFTs"}
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
                    <Button onClick={copy} marginLeft={"20"}>
                      Copy Voucher
                    </Button>
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
