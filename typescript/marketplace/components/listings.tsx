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
              {nfts.map((item: any) => (
                <Link href={`/listing/${item.id}`} key={item.id} passHref>
                  <Box border="1px" padding={4}>
                    <Flex align="center">
                      <Box>
                        <Image src={item.asset.image} />
                        <Text fontWeight="bold">{item.asset.name}</Text>
                        <Text fontSize="sm">{item.asset.description}</Text>
                      </Box>
                    </Flex>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          ) : (
            <>
              <Text>No Items</Text>
            </>
          )
        ) : (
          <Spinner />
        )}
      </Stack>
    </>
  );
};
