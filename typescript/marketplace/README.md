# Marketplace Example

This repo is a clonable project to set up a marketplace with auction and direct listing capabilities using Thirdweb marketplace contract. Users can also create ERC721 and ERC1115 NFTs just like in opensea. But unlike opensea everything is on-chain.

There are three Thirdweb contracts in it:

- Thirdweb Marketplace Contract
- Thirdweb NFT Collection Contract
- Thirdweb NFT Edition Contract

### Technologies used

     * The app uses [Moralis](https://moralis.io) APIs to create user profiles and list NFTs which they hold regardless of whether they’re listed on the marketplace or not.
     * Chakra UI

## Get Started

Clone it locally:

```bash
npx degit thirdweb-dev/examples/marketplace marketplace
```

The install the dependencies using:

```bash
cd marketplace
npm install
```

## Overview

The app has the following components:

- Marketplace front-page - has all the listings
- Profile page - see all the NFTs you hold (like in opensea)
- Create NFT page - let users also create NFTs using the NFT contracts.
- Project page - list down all the listings from a particular NFT collection.
