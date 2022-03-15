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

export default function Claimer() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const contract = useNFTCollection("0x1AF863CCa75201A619bE1Ba69797309ebb82c8b0")

  const [payloadValid, setPayloadValid] = useState(true);
  const [payload, setPayload] = useState<any>();
  const [signature, setSignature] = useState<string>();

  const mint = useCallback(async () => {
    
    const id = await contract?.signature.mint(payload);
    console.log(contract)

    toast({
      status: "success",
      title: "Successfully minted NFT with ID: " + id,
    });
  }, [payload, contract]);

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
            console.log(err)
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
            console.log(err)
            toast({
              status: "error",
              title: "Error minting NFT",
              description: err.message,
            });
          }
          setLoading(false);
        }}
        isLoading={loading}
        // disabled={
        //   payload === undefined
        // }
      >
        Mint NFT
      </Button>
    </Flex>
  );
}
