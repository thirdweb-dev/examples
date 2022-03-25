import {
  SimpleGrid,
  Box,
  Spinner,
  Flex,
  Image,
  Text,
  Heading,
  Center,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMarketplace, useAddress } from "@thirdweb-dev/react";
import { Page } from "components/Page";
import { BigNumber, ethers } from "ethers";
export default function Listing() {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>();
  const [buying, setBuying] = useState(false);
  const [bidAmount, setBidAmount] = useState<any>();
  const [sold, setSold] = useState<any>();
  const [winningBid, setWinningBid] = useState<any>();
  const [timer, setTimer] = useState<any>(undefined);
  const address = useAddress();
  const marketplaceAddress = "0xAf63a136ec6081D94b6eE4b773569B43aAf2c362";
  const marketplace = useMarketplace(marketplaceAddress);

  useEffect(() => {
    if (typeof id === "string") {
      setLoading(true);
      marketplace?.getListing(id).then((listing) => {
        setListing(listing);
        console.log(listing);
        if (listing.type === 1) {
          console.log(
            Date.now() -
              new Date(listing.startTimeInEpochSeconds.toString()).getTime()
          );
          setTimer(
            new Date(
              Date.now() -
                new Date(listing.startTimeInEpochSeconds.toString()).getTime()
            )
          );
        }
        setLoading(false);
      });
    }
  }, [id, marketplace, sold]);

  useEffect(() => {
    if (listing && listing.type === 1) {
      marketplace?.auction.getWinningBid(listing.id).then((offer) => {
        console.log(offer);
        setWinningBid(offer);
      });
    }
  }, [listing]);

  async function buyout() {
    setBuying(true);
    if (address) {
      if (listing.type === 0) {
        await marketplace
          ?.buyoutListing(listing.id, listing.quantity)
          .then((tx) => {
            console.log(tx);
            setBuying(false);
            setSold(true);
          })
          .catch((e) => {
            setBuying(false);
            toast({
              title: "Error",
              description: e.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      } else {
        await marketplace?.auction
          .buyoutListing(listing.id)
          .then((tx) => {
            console.log(tx);
            setBuying(false);
            setSold(true);
          })
          .catch((e) => {
            setBuying(false);
            toast({
              title: "Error",
              description: e.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      }
    } else {
      setBuying(false);
      toast({
        title: "You need to be logged in",
        description: "You need to be logged in to buy a listing",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  async function bid() {
    setBuying(true);
    if (address) {
      await marketplace?.auction
        .makeBid(listing.id, bidAmount)
        .then((tx) => {
          console.log(tx);
          setBuying(false);
          setSold(true);
        })
        .catch((e) => {
          setBuying(false);
          toast({
            title: "Error",
            description: e.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      setBuying(false);
      toast({
        title: "You need to be logged in",
        description: "You need to be logged in to buy a listing",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <Page>
      <Box px={16}>
        {loading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={2} minWidth={"100%"}>
            <Box border="1px" margin={"auto"} maxW={"60%"}>
              <Flex margin={"auto"}>
                <Box>
                  <Image src={listing.asset.image} />
                </Box>
              </Flex>
            </Box>
            <Box width={"full"}>
              <Heading>{listing.asset.name}</Heading>
              <Text>{listing.asset.description}</Text>
              <Box>
                <Flex>
                  <Box>
                    <Text>Buyout Price</Text>
                    <Heading as="h3">
                      {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </Heading>
                  </Box>
                  {listing.type === 1 ? (
                    <>
                      {/* <Box>
                        <Heading>
                          {`${timer.getMonth()}Mo ${timer.getDate()}D ${timer.getHours()}H ${timer.getMinutes()}M ${timer.getSeconds()}s`}
                        </Heading>
                      </Box> */}
                      <Box marginLeft={"5"}>
                        <Text>Reserve Price</Text>
                        <Heading as="h3">
                          {
                            listing.reservePriceCurrencyValuePerToken
                              .displayValue
                          }{" "}
                          {listing.reservePriceCurrencyValuePerToken.symbol}
                        </Heading>
                      </Box>
                      <Box marginLeft={"5"}>
                        <Text>Winning Bid</Text>
                        {winningBid ? (
                          <Heading as="h3">
                            {winningBid?.currencyValue.displayValue}{" "}
                            {winningBid?.currencyValue.symbol}
                          </Heading>
                        ) : (
                          <Spinner />
                        )}
                      </Box>
                    </>
                  ) : null}
                </Flex>
              </Box>
              <Box>
                {listing.type === 0 ? (
                  <Text>
                    <strong>Direct</strong>
                  </Text>
                ) : (
                  <Text>
                    <strong>Auction</strong>
                  </Text>
                )}
                <Flex>
                  <>
                    {listing?.quantity.toNumber() > 0 ? (
                      <Button onClick={buyout}>
                        {" "}
                        {buying ? <Spinner /> : "Buyout"}
                      </Button>
                    ) : (
                      <Text>Sold Out</Text>
                    )}
                  </>
                  <Box marginLeft={"5"}>
                    {listing.type === 1 && listing.quantity.toNumber() > 0 ? (
                      listing?.quantity.toNumber() > 0 ? (
                        <>
                          <Flex>
                            <Input
                              placeholder={`Bid Amount in ${listing.buyoutCurrencyValuePerToken.symbol}`}
                              type={"number"}
                              onChange={(e) => setBidAmount(e.target.value)}
                            />
                            <Button onClick={bid}>
                              {" "}
                              {buying ? <Spinner /> : "Bid"}
                            </Button>
                          </Flex>
                        </>
                      ) : (
                        <Text>Sold Out</Text>
                      )
                    ) : null}
                  </Box>
                </Flex>
              </Box>
            </Box>
          </SimpleGrid>
        )}
      </Box>
    </Page>
  );
}
