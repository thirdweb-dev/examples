import {
  Alert,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useProtectedPage } from "../hooks/useProtectedPage";

export default function Claimer() {
  useProtectedPage();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const contract = useNFTCollection(
    process.env.NEXT_PUBLIC_NFT_COLLECTION as string
  );

  const [payloadValid, setPayloadValid] = useState(true);
  const [payload, setPayload] = useState<any>();
  const [signature, setSignature] = useState<string>();

  const mint = useCallback(async () => {
    const id = await contract?.signature.mint(payload);
    console.log(contract);

    toast({
      status: "success",
      title: "Successfully minted NFT with ID: " + id,
    });
  }, [payload, contract]);

  return (
    <Flex flexDirection="column">
      <Heading textAlign="center">Claimer</Heading>

      <Text textAlign={"center"}>
        Bring your signed payload to claim your NFT!
      </Text>

      <Heading size="sm">Signed Payload</Heading>
      <Textarea
        minHeight="300px"
        onChange={(ev) => {
          const text = ev.target.value;
          if (!text.length) {
            setPayloadValid(true);
            return;
          }
          try {
            const payload = JSON.parse(text);
            setPayload(payload);
            setPayloadValid(true);
          } catch (err) {
            console.log(err);
            setPayloadValid(false);
          }
        }}
      ></Textarea>
      {!payloadValid && (
        <Alert status="warning">
          There is a JSON syntax error in your payload.
        </Alert>
      )}

      <Button
        marginTop={2}
        colorScheme="green"
        onClick={async () => {
          setLoading(true);
          try {
            await mint();
          } catch (err: any) {
            console.log(err);
            toast({
              status: "error",
              title: "Error minting NFT",
              description: err.message,
            });
          }
          setLoading(false);
        }}
        isLoading={loading}
      >
        Mint NFT
      </Button>
    </Flex>
  );
}
