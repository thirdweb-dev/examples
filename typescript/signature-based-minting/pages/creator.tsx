import { NATIVE_TOKEN_ADDRESS } from "@3rdweb/sdk";
import {
  Button,
  Flex,
  Heading,
  Textarea,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import useSdk from "../hooks/useSdk";

export default function Creator() {
  const [loading, setLoading] = useState(false);

  const sdk = useSdk();
  const toast = useToast();

  const module = useMemo(
    () => sdk.getNFTModule("0xc335111d58913C6A382F40c8B020b4ff1ee13Ba1"),
    [sdk]
  );

  const [payload, setPayload] = useState<any>();
  const [signature, setSignature] = useState<string>();

  const [metadata, setMetadata] = useState(`
  {
	    "name": "Some Awesome NFT",
		"description": "This is a description of the NFT",
		"image": "ipfs://bafkreiemrdnm26x3mpzjkhpewirwrzubjvuje2rbj2lgqexesbqq72utey"
  }
  `);

  const generateSignature = useCallback(async () => {
    let metadataJson: any;
    try {
      metadataJson = JSON.parse(metadata.trim());
    } catch (err) {
      toast({
        status: "error",
        title: "There's a syntax error in your metadata JSON",
      });
      return;
    }
    console.log("Generating sig with metadata:", metadataJson);

    const { payload, signature } = await module.generateSignature({
      metadata: metadataJson,
      price: 0,
      currencyAddress: NATIVE_TOKEN_ADDRESS,
      mintStartTimeEpochSeconds: Math.floor(Date.now() / 1000),
      mintEndTimeEpochSeconds:
        Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
      to: "0x0000000000000000000000000000000000000000",
    });
    setPayload(payload);
    setSignature(signature);
  }, [module, metadata]);

  return (
    <Flex flexDirection={"column"}>
      <Heading textAlign={"center"}>Creator</Heading>

      <Heading size="sm">Token Metadata</Heading>
      <Textarea
        onChange={(ev) => setMetadata(ev.target.value)}
        value={metadata}
        minHeight="300px"
      ></Textarea>

      <Button
        colorScheme="green"
        onClick={async () => {
          setLoading(true);
          try {
            await generateSignature();
          } catch (err) {
            console.error("Failed to generate signature", err);
          }
          setLoading(false);
        }}
        isLoading={loading}
      >
        Create Signature!
      </Button>

      {payload && (
        <Flex flexDirection="column" textAlign="center">
          <Heading m={2} size="md">
            Your new signature is ready 🎉
          </Heading>

          <Heading size="sm">Payload:</Heading>
          <Text>{JSON.stringify(payload)}</Text>

          <Heading size="sm">Signature:</Heading>
          <Text>{signature}</Text>
        </Flex>
      )}
    </Flex>
  );
}
