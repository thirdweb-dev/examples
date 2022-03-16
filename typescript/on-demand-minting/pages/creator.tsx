// we're importing 'NATIVE_TOKEN_ADDRESS' to make use of the native currency
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
// importing features for alerts and styling
import {
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useNFTCollection } from '@thirdweb-dev/react';

export default function Creator() {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const contract = useNFTCollection(
    '0x1AF863CCa75201A619bE1Ba69797309ebb82c8b0',
  );

  const [payload, setPayload] = useState<any>();
  // const [signature, setSignature] = useState<string>();

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
        status: 'error',
        title: "There's a syntax error in your metadata JSON",
      });
      return;
    }
    console.log('Generating sig with metadata:', metadataJson);

    const startTime = new Date();
    const endTime = new Date(Date.now() + 60 * 60 * 24 * 1000);
    const payload = await contract?.signature.generate({
      metadata: metadataJson, // The NFT to mint
      to: '0x55c9bBb71a5CC11c2f0c40362Bb691b33a78B764', // Who will receive the NFT (or AddressZero for anyone)
      price: 0.5, // the price to pay for minting
      currencyAddress: NATIVE_TOKEN_ADDRESS, // the currency to pay with
      mintStartTime: startTime, // can mint anytime from now
      mintEndTime: endTime, // to 24h from now,
      royaltyRecipient: '0x55c9bBb71a5CC11c2f0c40362Bb691b33a78B764', // custom royalty recipient for this NFT
      royaltyBps: 100, // custom royalty fees for this NFT (in bps)
      primarySaleRecipient: '0x55c9bBb71a5CC11c2f0c40362Bb691b33a78B764', // custom sale recipient for this NFT
    });
    setPayload(payload);
  }, [module, metadata]);

  return (
    <Flex flexDirection={'column'}>
      <Heading textAlign={'center'}>Creator</Heading>

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
            console.error('Failed to generate signature', err);
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
        </Flex>
      )}
    </Flex>
  );
}
