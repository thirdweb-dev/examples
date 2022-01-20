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
import useSdk from "../hooks/useSdk";

export default function Claimer() {
  const [loading, setLoading] = useState(false);
  const sdk = useSdk();
  const toast = useToast();

  const module = useMemo(
    () => sdk.getNFTModule("0xc335111d58913C6A382F40c8B020b4ff1ee13Ba1"),
    [sdk]
  );

  const [payloadValid, setPayloadValid] = useState(true);
  const [payload, setPayload] = useState<any>();
  const [signature, setSignature] = useState<string>();

  const mint = useCallback(async () => {
    const id = await module.mintWithSignature(payload, signature as string);

    toast({
      status: "success",
      title: "Successfully minted NFT with ID: " + id,
    });
  }, [payload, signature, module]);

  return (
    <Flex flexDirection="column">
      <Heading textAlign="center">Claimer</Heading>

      <Text textAlign={"center"}>
        Bring your payload and signature to claim your NFT!
      </Text>

      <Heading size="sm">Payload</Heading>
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
            setPayloadValid(false);
          }
        }}
      ></Textarea>
      {!payloadValid && (
        <Alert status="warning">
          There is a JSON syntax error in your payload.
        </Alert>
      )}

      <Heading marginTop={2} size="sm">
        Signature
      </Heading>
      <Input onChange={(ev) => setSignature(ev.target.value)}></Input>

      <Button
        marginTop={2}
        colorScheme="green"
        onClick={async () => {
          setLoading(true);
          try {
            await mint();
          } catch (err: any) {
            toast({
              status: "error",
              title: "Error minting NFT",
              description: err.message,
            });
          }
          setLoading(false);
        }}
        isLoading={loading}
        disabled={
          signature === undefined || payload === undefined || signature === ""
        }
      >
        Mint NFT
      </Button>
    </Flex>
  );
}
