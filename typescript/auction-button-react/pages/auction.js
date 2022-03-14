import React from "react";
import { useState } from "react";
import {
  ThirdwebProvider,
  ChainId,
  useAddress,
  useMetamask,
  useMarketplace,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

function Connect() {
  // get a function to connect to a particular wallet
  // options: useMetamask() - useCoinbase() - useWalletConnect()
  const connectWithMetamask = useMetamask();
  // once connected, you can get the connected wallet information from anywhere (address, signer)
  const address = useAddress();
  return (
    <div>
      <nav>
        {address ? (
          <h4>Connected as {address}</h4>
        ) : (
          <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
        )}
      </nav>
    </div>
  );
}

function AuctionComponent() {
  const market = useMarketplace("0xf7bd818c15a0642893fDc256D5D2836b951F3804");
  const nftSmartContractAddress = "0x1AF863CCa75201A619bE1Ba69797309ebb82c8b0";
  const currencySmartContractAddress =
    "0xf457dEFDC6F9db81E86B4769A265E4b10D454A7c";
  const [tokenId, setTokenId] = useState("");
  const [tokenIdOffer, setTokenIdOffer] = useState("");

  function auctionListingTokenId(event) {
    setTokenId(event.target.value);
  }
  function auctionListingTokenIdOffer(event) {
    setTokenIdOffer(event.target.value);
  }
  function submitAuctionListing(event) {
    event.preventDefault();
    createAuctionListing();
  }

  const [listId, setListId] = useState("");
  const [listIdBid, setListIdOffer] = useState("");

  function auctionListingListId(event) {
    setListId(event.target.value);
  }
  function auctionListingListIdQuantity(event) {
    setListIdOffer(event.target.value);
  }
  function submitAuctionListingOffer(event) {
    event.preventDefault();
    makeBid();
  }

  //setting the minimum bid as 100th of the buyout price
  const tokenIdReserve = tokenIdOffer / 100;
  const tokenIdReservePrice = tokenIdReserve.toString();

  const createAuctionListing = async () => {
    await market.auction.createListing({
      assetContractAddress: nftSmartContractAddress,
      buyoutPricePerToken: tokenIdOffer,
      currencyContractAddress: currencySmartContractAddress,
      startTimeInSeconds: Math.floor(Date.now() / 1000),
      listingDurationInSeconds: 60 * 2,
      tokenId: tokenId,
      quantity: 1,
      reservePricePerToken: tokenIdReservePrice,
    });
  };

  const makeBid = async () => {
    await market.auction.makeBid({
      listingId: listId,
      pricePerToken: listIdBid,
    });
  };
  return (
    <div>
      <form className={styles.forminline} onSubmit={submitAuctionListing}>
        <input
          className={styles.input}
          type="text"
          placeholder="enter token ID to list AUCTION"
          onChange={auctionListingTokenId}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="enter offer for the listing AUCTION"
          onChange={auctionListingTokenIdOffer}
        />
        <button className={styles.button}>
          Submit Token ID for Auction Listing
        </button>
      </form>
      <form className={styles.forminline} onSubmit={submitAuctionListingOffer}>
        <input
          className={styles.input}
          type="text"
          placeholder="enter AUCTION listing ID"
          onChange={auctionListingListId}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="enter bid for AUCTION"
          onChange={auctionListingListIdQuantity}
        />
        <button>Make a Bid</button>
      </form>
      <br />
    </div>
  );
}

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Connect />
      <AuctionComponent />
    </ThirdwebProvider>
  );
};

export default App;
