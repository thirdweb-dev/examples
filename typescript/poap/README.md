# Proof of attendance

This is a simple implementation of signature based minting using thirdweb React SDK.

This app will let individual creators bring in their contracts (which they can deploy using the [thirdweb dashboard](https://thirdweb.com)) and create an event.

Once they have created an event, people who have minting permission in the particular contract will be able to issue "vouchers" which the issuee can claim via the claim pages.

## Get Started

Clone it locally:

```bash
npx degit thirdweb-dev/examples/poap poap
```

The install the dependencies using:

```bash
cd poap
npm install
```

## Overview

The app has three main pages:

1. `/create`: where the creator imports the contract
2. `/issue`: where the creator issues vouchers
3. `/claim`: where the issuee can claim the vouchers

For the sake of simplicity, we've used a local JSON file to store data, but you can use any database or storage you like.

A brief overview of how it works:

1. The creator deploys an NFT Collection contract through [thirdweb dashboard](https://thirdweb.com) on **Mumbai** testnet.
2. The creator goes to `/create` and imports this contract into the app
3. The creator can now start issuing vouchers by clicking on the issue button and going to `/issue`. the can either limit the voucher to a specific address or make the voucher open to all. In both ways, the voucher can be used only once.
4. The issuee can now visit the claim page at `/claim` and claim the voucher. They can be given either the voucher code or the link to the claiming page itself.
