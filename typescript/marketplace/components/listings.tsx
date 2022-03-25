import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Listings = () => {
  const address = useAddress();
  // React state for a list of nfts in the nft collection
  const [nfts, setNFTs] = useState<(AuctionListing | DirectListing)[]>([]);
  const [loading, setLoading] = useState(true);

  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const marketplaceAddress = "0xAf63a136ec6081D94b6eE4b773569B43aAf2c362";
  const marketplace = useMarketplace(marketplaceAddress);
  useEffect(() => {
    // get all the NFTs including the owner from the nft collection.
    // Note: you can use async/await too!
    marketplace
      ?.getActiveListings()
      .then((allNFTs) => setNFTs(allNFTs))
      .then(() => setLoading(false));
  }, [address, marketplace]);
  return (
    <>
      <Stack>
        {!loading ? (
          nfts.length ? (
            <SimpleGrid columns={4} spacing={10}>
              {nfts.map((sword: any) => (
                <Link href={`/listing/${sword.id}`} key={sword.id} passHref >
                  <Box border="1px" padding={4}>
                    <Flex align="center">
                      <Box>
                        <Image src={sword.asset.image} />
                        <Text fontWeight="bold">{sword.asset.name}</Text>
                        <Text fontSize="sm">{sword.asset.description}</Text>
                      </Box>
                    </Flex>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          ) : (
            <>
              <Text>No swords</Text>
            </>
          )
        ) : (
          <Spinner />
        )}
      </Stack>
    </>
  );
};
