import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Spinner,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import {
  AuctionListing,
  DirectListing,
  NATIVE_TOKEN_ADDRESS,
} from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Profile = () => {
  const router = useRouter();
  const marketplaceAddress = "0xAf63a136ec6081D94b6eE4b773569B43aAf2c362";
  const marketplace = useMarketplace(marketplaceAddress);
  const address = useAddress();
  const toast = useToast();
  // React state for a list of nfts in the nft collection
  const [nfts, setNFTs] = useState<(AuctionListing | DirectListing)[]>([]);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(false);
  async function list(address: string, token: string) {
    setListing(true);
    marketplace?.direct
      .createListing({
        assetContractAddress: address,
        /**
         * The ID of the token to list.
         */
        tokenId: token,
        /**
         * The start time of the listing.
         */
        startTimeInSeconds: 0,
        /**
         * The duration of the listing in seconds.
         */
        listingDurationInSeconds: 60 * 60 * 24 * 7,
        /**
         * The quantity of tokens to include in the listing.
         *
         * For ERC721s, this value should always be 1 (and will be forced internally regardless of what is passed here).
         */
        quantity: 1,
        /**
         * The address of the currency to accept for the listing.
         */
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        /**
         * The buyout price of the listing.
         *
         * So if the `quantity = 10` and the `reserve price = 1`, then the buyout price
         * is 10 coins (of the configured currency).
         */
        buyoutPricePerToken: 0,
      })
      .then((listing) => {
        setListing(false);
        toast({
          title: "Listing created",
          description: `You have successfully created a listing for ${listing.id.toString()}`,
        });
        router.push(`/listing/${listing.id.toString()}`);
      })
      .catch((err) => {
        setListing(false);
        toast({
          title: "Listing failed",
          description: `Failed to create a listing: ${err.message}`,
          status: "error",
        });
      });
  }
  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  useEffect(() => {
    setLoading(false);
    fetch(`/api/listings?Address=${address}`)
      .then(async (resp) => resp.json())
      .then((resp) =>
        setNFTs(
          resp.result.map((item: any) => {
            item.metadata = JSON.parse(item.metadata);
            return item;
          })
        )
      )
      .then(() => setLoading(false));
  }, [address]);

  useEffect(() => {
    console.log(nfts);
  }, [nfts]);

  return (
    <>
      <Stack>
        {!loading ? (
          nfts.length ? (
            <SimpleGrid columns={4} spacing={10}>
              {nfts.map((item: any) => (
                <Box border="1px" padding={4} key={null}>
                  <Flex align="center">
                    <Box overflowX={"clip"}>
                      <Image src={item?.metadata?.image} />
                      <Text fontWeight="bold">{item?.metadata?.name}</Text>
                      <Text fontSize="sm">{item?.metadata?.description}</Text>
                      <br />
                      <Button
                        onClick={() =>
                          list(item?.token_address, item?.token_id)
                        }
                      >
                        {listing ? <Spinner /> : "List"}
                      </Button>
                    </Box>
                  </Flex>
                </Box>
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
