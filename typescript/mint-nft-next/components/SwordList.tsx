import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";

export const SwordList = () => {
  const address = useAddress();
  // React state for a list of nfts in the nft collection
  const [nfts, setNFTs] = useState([] as NFTMetadataOwner[]);

  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const nftCollectionAddress = "0xc134230F2e67a96B41DABFF7063530178d668601";
  const nftCollection = useNFTCollection(nftCollectionAddress);
  useEffect(() => {
    // get all the NFTs including the owner from the nft collection.
    // Note: you can use async/await too!
    nftCollection?.getOwned(address).then((allNFTs) => setNFTs(allNFTs));
  }, [address, nftCollection]);
  return (
    <>
      <Stack>
        {nfts.length ? (
          nfts.map((sword: any) => (
            <Box key={sword.metadata.id} border="1px" padding={4}>
              <Flex align="center">
                <Box>
                  <Image src={sword.metadata.image} boxSize="64px" />
                  <Text fontWeight="bold">{sword.metadata.name}</Text>
                  <Text fontSize="sm">{sword.metadata.description}</Text>
                </Box>

                <Box fontSize="xs">
                  <pre>{JSON.stringify(sword.properties, null, 2)}</pre>
                </Box>
              </Flex>
            </Box>
          ))
        ) : (
          <>
            <Text>No swords</Text>
          </>
        )}
      </Stack>
    </>
  );
};
