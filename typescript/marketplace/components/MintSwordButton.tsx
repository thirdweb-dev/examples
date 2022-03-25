import React, { useEffect, useState } from "react";
import {
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  Spinner,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  SimpleGrid,
  Box,
  Image,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ConnectWalletButton } from "./ConnectWallet";

export const MintSwordButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<any>(undefined);
  const toast = useToast();
  const address = useAddress();
  const onMintHandler = async () => {
    toast({
      title: "Minting...",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
    setLoading(true);
    // make a backend server api request to mint an NFT
    await fetch("/api/mint_sword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ address }),
    }).then((response) => {
      setLoading(false);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Your sword has been minted",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };
  useEffect(() => {
    fetch(`/api/listings?Address=${address}`)
      .then(async (resp) => resp.json())
      .then((resp) => setListings(resp.result));
  }, [isOpen]);

  // render the button to mint a sword NFT
  return address ? (
    <>
      <Button onClick={onOpen}>Create Listing</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <ModalHeader>Create Listing</ModalHeader>
              <ModalCloseButton />
              <ModalBody overflowY={"scroll"} maxHeight={"50vh"}>
                <SimpleGrid columns={2} spacing={10}>
                  {listings
                    ?.map((item: any) => JSON.parse(item.metadata))
                    .map((item: any) => (
                      <Box key={item?.image} border="1px" padding={4}>
                        <Image
                          src={item?.image == null? "https://via.placeholder.com/400" : item?.image}
                        />
                      </Box>
                    ))}
                </SimpleGrid>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  ) : (
    <ConnectWalletButton />
  );
};
