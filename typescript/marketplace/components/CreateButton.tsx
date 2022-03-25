import React, { useEffect, useState } from "react";
import {
  Button,
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

export const CreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any>(undefined);
  const address = useAddress();

  useEffect(() => {
    setLoading(false);
    fetch(`/api/listings?Address=${address}`)
      .then(async (resp) => resp.json())
      .then((resp) => setListings(resp.result))
      .then(() => setLoading(false));
  }, [isOpen]);

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
                          src={
                            item?.image == null
                              ? "https://via.placeholder.com/400"
                              : item?.image
                          }
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
